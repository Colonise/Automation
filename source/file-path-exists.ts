import * as fs from 'fs';

export async function filePathExists(filePath: string): Promise<boolean> {
    return fs.promises.access(filePath, fs.constants.F_OK)
        .then(
            () => true,
            () => false
        );
}
