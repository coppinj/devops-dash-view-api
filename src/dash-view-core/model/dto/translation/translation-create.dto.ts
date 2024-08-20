import { ITranslationCreateDTO } from '@dash-view-common';
import { IsNotEmpty, IsString } from 'class-validator';

export class TranslationCreateDTO implements ITranslationCreateDTO {
  @IsNotEmpty()
  @IsString()
    fr: string;
}
