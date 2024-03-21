import { IPipelineReadDTO } from '@dash-view-common';
import { ReadDTO } from '../common';
import { TestClassReadDTO } from '../test-class';

export class PipelineReadDTO extends ReadDTO implements IPipelineReadDTO {
  completeDate: Date;
  startDate: Date;
  testClasses: TestClassReadDTO[];
}