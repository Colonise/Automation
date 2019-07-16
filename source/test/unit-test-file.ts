import { toPascalCase } from '@colonise/utilities';
import ts from 'typescript';
import { createFileWithNewExtension } from '../create-file-with-new-extension';
import { Reader } from '../reader';
import { Writer } from '../writer';

export async function unitTestFile(filePath: string, options: ts.CompilerOptions): Promise<string> {
    const unitTestsFilePath = await createFileWithNewExtension(filePath, '.spec.ts');

    const reader = new Reader(filePath, options);
    const exportedNodes = reader.getExportedNodes();
    // const currentContentsBuffer = await fs.promises.readFile(documentationFilePath);
    // const currentContentsString = currentContentsBuffer.toString();

    const writer = new Writer(unitTestsFilePath);

    writer.write(`import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';`);
    writer.writeOnNewLine(`import { ${exportedNodes.map(exportedNode => exportedNode.symbolName).join(', ')} } from './${reader.name}';`);
    writer.writeNewLine();
    writer.writeOnNewLine(`// Unit Tests for ./${reader.base}`);
    writer.writeNewLine();

    for (const exportedNode of exportedNodes) {
        if (ts.isFunctionDeclaration(exportedNode.node)) {
            writer.writeOnNewLine(`@TestFixture('${exportedNode.symbolName}() Tests')`);
            writer.writeOnNewLine(`export class ${toPascalCase(exportedNode.symbolName)}Tests {`);

            writer.indent(() => {
                writer.writeOnNewLine('@IgnoreTest()');
                writer.writeOnNewLine(`@TestCase(/* parameters */ undefined, /* expected */ undefined)`);
                writer.writeOnNewLine(`@Test('${exportedNode.symbolName}() should ...')`);
                writer.writeOnNewLine(`public ${exportedNode.symbolName}1(parameters: Parameters<typeof ${exportedNode.symbolName}>, expected: ReturnType<typeof ${exportedNode.symbolName}>) {`);

                writer.indent(() => {
                    writer.writeOnNewLine(`const actual = ${exportedNode.symbolName}(...parameters);`);
                    writer.writeNewLine();
                    writer.writeOnNewLine('Expect(actual).toEqual(expected);');
                });

                writer.writeOnNewLine(`}`);
            });

            writer.writeOnNewLine(`}`);
            writer.writeNewLine();
        }
    }

    writer.close();

    return unitTestsFilePath;
}
