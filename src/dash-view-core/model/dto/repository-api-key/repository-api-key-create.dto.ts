import { IRepositoryApiKeyCreateDTO } from '@dash-view-common';
import { IsDate, IsOptional } from 'class-validator';

export class RepositoryApiKeyCreateDTO implements IRepositoryApiKeyCreateDTO {
  @IsOptional()
  @IsDate()
    expirationDate: Date;
}