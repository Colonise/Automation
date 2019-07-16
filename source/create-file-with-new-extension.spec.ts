import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { createFileWithNewExtension } from './create-file-with-new-extension';

// Unit Tests for ./create-file-with-new-extension.ts

@TestFixture('createFileWithNewExtension() Tests')
export class CreateFileWithNewExtensionTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('createFileWithNewExtension() should ...')
    public createFileWithNewExtension1(parameters: Parameters<typeof createFileWithNewExtension>, expected: ReturnType<typeof createFileWithNewExtension>) {
        const actual = createFileWithNewExtension(...parameters);

        Expect(actual).toEqual(expected);
    }
}
