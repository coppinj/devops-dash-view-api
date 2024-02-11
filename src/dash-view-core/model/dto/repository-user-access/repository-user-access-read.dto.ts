import { IRepositoryUserAccessReadDTO } from '@dash-view-common';
import { ReadDTO } from '../common';

export class RepositoryUserAccessReadDTO extends ReadDTO implements IRepositoryUserAccessReadDTO {
  endDate: Date;
  userID: number;
}