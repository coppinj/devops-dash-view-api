import { IRepositoryApiKeyListDTO } from '@dash-view-common';
import { ListDTO } from '../common';

export class RepositoryApiKeyListDTO extends ListDTO implements IRepositoryApiKeyListDTO {
  expirationDate: Date;
  lastAccessedDate: Date;
}