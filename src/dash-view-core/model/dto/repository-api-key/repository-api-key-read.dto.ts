import { IRepositoryApiKeyReadDTO } from '@dash-view-common';
import { ReadDTO } from '../common';

export class RepositoryApiKeyReadDTO extends ReadDTO implements IRepositoryApiKeyReadDTO {
  expirationDate: Date;
  lastAccessDate: Date;
}