import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { filePathExists } from './file-path-exists';

// Unit Tests for ./file-path-exists.ts

@TestFixture('filePathExists() Tests')
export class FilePathExistsTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('filePathExists() should ...')
    public filePathExists1(parameters: Parameters<typeof filePathExists>, expected: ReturnType<typeof filePathExists>) {
        const actual = filePathExists(...parameters);

        Expect(actual).toEqual(expected);
    }
}
