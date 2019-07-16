import ts from 'typescript';
import { createFileWithNewExtension } from '../create-file-with-new-extension';
import { Reader } from '../reader';
import { Writer } from '../writer';

export async function documentFile(filePath: string, options: ts.CompilerOptions): Promise<string> {
    const documentationFilePath = await createFileWithNewExtension(filePath, '.md');

    const reader = new Reader(filePath, options);
    const exportedNodes = reader.getExportedNodes();
    // const currentContentsBuffer = await fs.promises.readFile(documentationFilePath);
    // const currentContentsString = currentContentsBuffer.toString();

    const writer = new Writer(documentationFilePath);

    writer.write(`# Documentation for [${reader.base}][/${reader.base}]`);
    writer.writeNewLine();

    for (const exportedNode of exportedNodes) {
        writer.writeOnNewLine(`### ${exportedNode.nodeName} '${exportedNode.symbolName}'`);
        writer.writeNewLine();
        writer.writeOnNewLine('TODO');
        writer.writeNewLine();
    }

    writer.close();

    return documentationFilePath;
}
