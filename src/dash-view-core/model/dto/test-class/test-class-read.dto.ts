import { ITestClassReadDTO } from '@dash-view-common';
import { ReadDTO } from '../common';
import { TestMethodReadDTO } from '../test-method';

export class TestClassReadDTO extends ReadDTO implements ITestClassReadDTO {
  methods: TestMethodReadDTO[];
  name: string;
  sourceCode: string;
  validated: boolean;
}