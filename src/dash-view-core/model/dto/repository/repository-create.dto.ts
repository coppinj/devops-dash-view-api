import { IRepositoryCreateDTO } from '@dash-view-common';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RepositoryCreateDTO implements IRepositoryCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}