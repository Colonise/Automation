import * as path from 'path';
import ts from 'typescript';

export interface ExportedNode<TNode extends ts.Node = ts.Node> {
    node: TNode;
    nodeName: string;
    symbolName: string;
}

export class Reader {
    public errors: unknown[] = [];

    public readonly program: ts.Program;
    public readonly typeChecker: ts.TypeChecker;
    public readonly sourceFile: ts.SourceFile;
    public exportedNodes: ExportedNode[] = [];

    public readonly base: string;
    public readonly name: string;
    public readonly extension: string;
    public readonly directory: string;
    public readonly root: string;

    public constructor(public readonly filePath: string, options: ts.CompilerOptions) {
        // Build a program using the set of root file names in fileNames
        this.program = ts.createProgram([filePath], options);
        const sourceFile = this.program.getSourceFile(filePath);

        if (!sourceFile) {
            throw new Error(`Reader can not find source file at '${filePath}'.`);
        }

        this.sourceFile = sourceFile;

        // Get the checker, we will use it to find more about classes
        this.typeChecker = this.program.getTypeChecker();

        const parsedFilePath = path.parse(filePath);

        this.base = parsedFilePath.base;
        this.name = parsedFilePath.name;
        this.extension = parsedFilePath.ext;
        this.directory = parsedFilePath.dir;
        this.root = parsedFilePath.root;
    }

    public getExportedNodes() {
        this.exportedNodes = [];

        if (!this.sourceFile.isDeclarationFile) {
            // Walk the tree
            ts.forEachChild(this.sourceFile, node => {
                this.visitNode(node, this.exportedNodes);
            });
        }

        return this.exportedNodes;
    }

    private isExportedBySourceFile(node: ts.Node) {
        return this.isExported(node) && node.parent === this.sourceFile;
    }

    private isExported(node: ts.Node): boolean {
        if (!node.modifiers) {
            return false;
        }

        return node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword);
    }

    private hasName<T extends ts.Node>(node: T): node is T & { name: ts.Node } {
        return 'name' in node;
    }

    private getSymbolName(node: ts.Node): string {
        const symbol = this.hasName(node) ? this.typeChecker.getSymbolAtLocation(node.name) : undefined;
        const symbolName = symbol ? symbol.getName() : `Anonymous`;

        return symbolName;
    }

    private getNodeName(node: ts.Node): string {
        switch (node.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                return 'Class';

            case ts.SyntaxKind.EnumDeclaration:
                return 'Enum';

            case ts.SyntaxKind.FunctionDeclaration:
                return 'Function';

            case ts.SyntaxKind.InterfaceDeclaration:
                return 'Interface';

            case ts.SyntaxKind.TypeAliasDeclaration:
                return 'Type Alias';

            case ts.SyntaxKind.VariableDeclaration:
                return 'Variable';

            default:
                return 'Unknown';
        }
    }

    private visitNode(node: ts.Node, exportedNodes: ExportedNode[]): ExportedNode[] {
        // VariableStatements export their declaraction list
        if (this.isExportedBySourceFile(node) && !ts.isVariableStatement(node)) {
            exportedNodes.push(this.getExportedNode(node));
        } else if (ts.isVariableDeclaration(node) && this.isExportedBySourceFile(node.parent.parent)) {
            exportedNodes.push(this.getExportedNode(node));
        }

        ts.forEachChild(node, childNode => {
            this.visitNode(childNode, exportedNodes);
        });

        return exportedNodes;
    }

    private getExportedNode(node: ts.Node): ExportedNode {
        return {
            node,
            nodeName: this.getNodeName(node),
            symbolName: this.getSymbolName(node)
        };
    }
}
