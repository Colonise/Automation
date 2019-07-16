import { filePathExists } from './file-path-exists';

export async function getMissingFilePaths(filePaths: string[]): Promise<string[]> {
    const missingFiles: string[] = [];

    await Promise.all(filePaths.map(async filePath => {
        const exists = await filePathExists(filePath);

        if (exists) {
            missingFiles.push(filePath);
        }
    }));

    return missingFiles;
}
