import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { documentFiles } from './document-files';

// Unit Tests for ./document-files.ts

@TestFixture('documentFiles() Tests')
export class DocumentFilesTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('documentFiles() should ...')
    public documentFiles1(parameters: Parameters<typeof documentFiles>, expected: ReturnType<typeof documentFiles>) {
        const actual = documentFiles(...parameters);

        Expect(actual).toEqual(expected);
    }
}
