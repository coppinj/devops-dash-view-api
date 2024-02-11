import { IRepositoryUserAccessListDTO } from '@dash-view-common';
import { ListDTO } from '../common';

export class RepositoryUserAccessListDTO extends ListDTO implements IRepositoryUserAccessListDTO {
  email: string;
  endDate: Date;
}