import { createFileWithNewExtension } from '../create-file-with-new-extension';

export async function documentFile(filePath: string): Promise<string> {
    return createFileWithNewExtension(filePath, '.md');
}
