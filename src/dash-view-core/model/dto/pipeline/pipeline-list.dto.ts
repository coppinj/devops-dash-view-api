import { IPipelineListDTO } from '@dash-view-common';
import { ListDTO } from '../common';

export class PipelineListDTO extends ListDTO implements IPipelineListDTO {
  completeDate: Date;
  count: number;
  startDate: Date;
}