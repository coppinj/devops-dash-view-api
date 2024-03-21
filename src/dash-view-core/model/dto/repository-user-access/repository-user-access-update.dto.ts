import { IRepositoryUserAccessUpdateDTO } from '@dash-view-common';
import { IsDate, IsOptional } from 'class-validator';

export class RepositoryUserAccessUpdateDTO implements IRepositoryUserAccessUpdateDTO {
  @IsOptional()
  @IsDate()
  endDate: Date;
}