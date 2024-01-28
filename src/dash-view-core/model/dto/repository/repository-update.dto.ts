import { IRepositoryUpdateDTO } from '@dash-view-common';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RepositoryUpdateDTO implements IRepositoryUpdateDTO {
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
    url: string;
}