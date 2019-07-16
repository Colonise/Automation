import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { unitTestFiles } from './unit-test-files';

// Unit Tests for ./unit-test-files.ts

@TestFixture('unitTestFiles() Tests')
export class UnitTestFilesTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('unitTestFiles() should ...')
    public unitTestFiles1(parameters: Parameters<typeof unitTestFiles>, expected: ReturnType<typeof unitTestFiles>) {
        const actual = unitTestFiles(...parameters);

        Expect(actual).toEqual(expected);
    }
}
