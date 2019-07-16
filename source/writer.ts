import * as fs from 'fs';
import * as path from 'path';

export class Writer {
    public isClosed = false;
    public errors: unknown[] = [];

    public readonly base: string;
    public readonly name: string;
    public readonly extension: string;
    public readonly directory: string;
    public readonly root: string;

    private readonly writeStream: fs.WriteStream;
    private currentIndent = 0;

    public constructor(public readonly filePath: string) {
        this.writeStream = fs.createWriteStream(filePath);

        const parsedFilePath = path.parse(filePath);

        this.base = parsedFilePath.base;
        this.name = parsedFilePath.name;
        this.extension = parsedFilePath.ext;
        this.directory = parsedFilePath.dir;
        this.root = parsedFilePath.root;
    }

    public write(text: string): void {
        this.throwIfClosed();

        this.writeStream.write(this.getIndent() + text, error => {
            if (error) {
                this.errors.push(error);
            }
        });
    }

    public writeOnNewLine(text: string): void {
        this.writeNewLine();
        this.write(text);
    }

    public writeNewLine(): void {
        const originalIndent = this.currentIndent;

        this.currentIndent = 0;

        this.write('\n');

        this.currentIndent = originalIndent;
    }

    public indent(func: () => void): void {
        this.currentIndent += 1;

        func();

        this.currentIndent -= 1;
    }

    public close(): void {
        this.throwIfClosed();

        this.writeStream.close();
        this.isClosed = true;
    }

    private getIndent() {
        return ''.padStart(this.currentIndent * 4, ' ');
    }

    private throwIfClosed(): void {
        if (this.isClosed) {
            throw new Error('Writer WriteStream is closed.');
        }
    }
}
