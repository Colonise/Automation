import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { getMissingFilePaths } from './get-missing-file-paths';

// Unit Tests for ./get-missing-file-paths.ts

@TestFixture('getMissingFilePaths() Tests')
export class GetMissingFilePathsTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('getMissingFilePaths() should ...')
    public getMissingFilePaths1(parameters: Parameters<typeof getMissingFilePaths>, expected: ReturnType<typeof getMissingFilePaths>) {
        const actual = getMissingFilePaths(...parameters);

        Expect(actual).toEqual(expected);
    }
}
