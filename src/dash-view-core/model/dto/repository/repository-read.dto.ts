import { IRepositoryReadDTO } from '@dash-view-common';
import { ReadDTO } from '../common';

export class RepositoryReadDTO extends ReadDTO implements IRepositoryReadDTO {
  name: string;
  url: string;
}