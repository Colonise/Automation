import { createFileWithNewExtension } from '../create-file-with-new-extension';

export async function unitTestFile(filePath: string): Promise<string> {
    return createFileWithNewExtension(filePath, '.spec.ts');
}
