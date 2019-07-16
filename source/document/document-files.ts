import ts from 'typescript';
import { getFilePaths } from '../get-file-paths';
import { documentFile } from './document-file';

export async function documentFiles(pattern: string, options: ts.CompilerOptions): Promise<string[]> {
    const filePaths = await getFilePaths(pattern);

    const newDocumentFiles: string[] = [];

    await Promise.all(filePaths.map(async filePath => {
        try {
            const newDocumentFile = await documentFile(filePath, options);

            newDocumentFiles.push(newDocumentFile);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
        }
    }));

    return newDocumentFiles;
}
