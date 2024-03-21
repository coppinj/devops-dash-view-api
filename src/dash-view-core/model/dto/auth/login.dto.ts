import { ILoginDTO } from '@dash-view-common';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO implements ILoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}