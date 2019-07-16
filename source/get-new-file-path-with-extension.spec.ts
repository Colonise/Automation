import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { getNewFilePathWithExtension } from './get-new-file-path-with-extension';

// Unit Tests for ./get-new-file-path-with-extension.ts

@TestFixture('getNewFilePathWithExtension() Tests')
export class GetNewFilePathWithExtensionTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('getNewFilePathWithExtension() should ...')
    public getNewFilePathWithExtension1(parameters: Parameters<typeof getNewFilePathWithExtension>, expected: ReturnType<typeof getNewFilePathWithExtension>) {
        const actual = getNewFilePathWithExtension(...parameters);

        Expect(actual).toEqual(expected);
    }
}
