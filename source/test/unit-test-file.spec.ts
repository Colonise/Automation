import { Expect, IgnoreTest, Test, TestCase, TestFixture } from 'alsatian';
import { unitTestFile } from './unit-test-file';

// Unit Tests for ./unit-test-file.ts

@TestFixture('unitTestFile() Tests')
export class UnitTestFileTests {
    @IgnoreTest()
    @TestCase(/* parameters */ undefined, /* expected */ undefined)
    @Test('unitTestFile() should ...')
    public unitTestFile1(parameters: Parameters<typeof unitTestFile>, expected: ReturnType<typeof unitTestFile>) {
        const actual = unitTestFile(...parameters);

        Expect(actual).toEqual(expected);
    }
}
