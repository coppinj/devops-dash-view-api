import { IRepositoryListDTO } from '@dash-view-common';
import { ListDTO } from '../common';

export class RepositoryListDTO extends ListDTO implements IRepositoryListDTO {
  name: string;
  url: string;
}