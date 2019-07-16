import { getFilePaths } from '../get-file-paths';
import { documentFile } from './document-file';

export async function documentFiles(pattern: string): Promise<string[]> {
    const filePaths = await getFilePaths(pattern);

    const newDocumentFiles: string[] = [];

    await Promise.all(filePaths.map(async filePath => {
        try {
            const newDocumentFile = await documentFile(filePath);

            newDocumentFiles.push(newDocumentFile);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }));

    return newDocumentFiles;
}
