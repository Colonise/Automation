import * as path from 'path';

export function getNewFilePathWithExtension(filePath: string, extension: string): string {
    const extensionWithDot = extension[0] === '.' ? extension : `.${extension}`;

    const absoluteFilePath = path.resolve(filePath);

    const parsedFilePath = path.parse(absoluteFilePath);

    const absoluteMarkDownFilePath = path.resolve(parsedFilePath.dir, parsedFilePath.name + extensionWithDot);

    return absoluteMarkDownFilePath;
}
