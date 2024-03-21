import { ITestMethodReadDTO } from '@dash-view-common';
import { ReadDTO } from '../common';

export class TestMethodReadDTO extends ReadDTO implements ITestMethodReadDTO {
  row: number;
  rows: number;
  validated: boolean;
}