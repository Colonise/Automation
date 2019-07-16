import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { documentFile } from './document-file';

// Unit Tests for ./document-file.ts

@TestFixture('documentFile() Tests')
export class DocumentFileTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('documentFile() should ...')
    public documentFile1(parameters: Parameters<typeof documentFile>, expected: ReturnType<typeof documentFile>) {
        const actual = documentFile(...parameters);

        Expect(actual).toEqual(expected);
    }
}
