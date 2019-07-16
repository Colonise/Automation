import { default as glob } from 'glob';
import path from 'path';

export async function getFilePaths(pattern: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        glob(
            pattern,
            {
                dot: true,
                nodir: true
            },
            (error, matches) => {
                if (error) {
                    reject(error);
                } else {
                    const filePaths = matches.map(filePath => path.resolve(filePath));

                    resolve(filePaths);
                }
            });
    });
}
