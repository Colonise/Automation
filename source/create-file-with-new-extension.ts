import * as fs from 'fs';
import * as path from 'path';
import { filePathExists } from './file-path-exists';
import { getNewFilePathWithExtension } from './get-new-file-path-with-extension';

export async function createFileWithNewExtension(filePath: string, extension: string): Promise<string> {
    const absoluteFilePath = path.resolve(filePath);
    const fileExists = await filePathExists(absoluteFilePath);

    if (!fileExists) {
        throw new Error(`Cannot create file. File '${absoluteFilePath}' does not exists.`);
    }

    const absoluteMarkDownFilePath = getNewFilePathWithExtension(absoluteFilePath, extension);

    const absoluteMarkDownFilePathExists = await filePathExists(absoluteMarkDownFilePath);

    if (absoluteMarkDownFilePathExists) {
        throw new Error(`Cannot create file. File '${absoluteMarkDownFilePath}' already exists.`)
    }

    await fs.promises.writeFile(absoluteMarkDownFilePath, '');

    return absoluteMarkDownFilePath;
}
