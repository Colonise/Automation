import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { getFilePaths } from './get-file-paths';

// Unit Tests for ./get-file-paths.ts

@TestFixture('getFilePaths() Tests')
export class GetFilePathsTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('getFilePaths() should ...')
    public getFilePaths1(parameters: Parameters<typeof getFilePaths>, expected: ReturnType<typeof getFilePaths>) {
        const actual = getFilePaths(...parameters);

        Expect(actual).toEqual(expected);
    }
}
