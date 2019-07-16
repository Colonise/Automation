import ts from 'typescript';
import { getFilePaths } from '../get-file-paths';
import { unitTestFile } from './unit-test-file';

export async function unitTestFiles(pattern: string, options: ts.CompilerOptions): Promise<string[]> {
    const filePaths = await getFilePaths(pattern);

    const newUnitTestFiles: string[] = [];

    await Promise.all(filePaths.map(async filePath => {
        try {
            const newUnitTestFile = await unitTestFile(filePath, options);

            newUnitTestFiles.push(newUnitTestFile);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    }));

    return newUnitTestFiles;
}
