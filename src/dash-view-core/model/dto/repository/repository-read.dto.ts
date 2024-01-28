import { IRepositoryReadDTO } from '@dash-view-common';
import { ReadDTO } from '@dash-view-core';

export class RepositoryReadDTO extends ReadDTO implements IRepositoryReadDTO {
  name: string;
  url: string;
}