import { IRepositoryUserAccessCreateDTO } from '@dash-view-common';
import { IsDate, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class RepositoryUserAccessCreateDTO implements IRepositoryUserAccessCreateDTO {
  @IsOptional()
  @IsDate()
    endDate: Date;

  @IsNotEmpty()
  @IsInt()
    userID: number;
}