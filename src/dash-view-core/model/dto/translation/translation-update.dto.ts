import { ITranslationUpdateDTO } from '@dash-view-common';
import { IsNotEmpty, IsString } from 'class-validator';

export class TranslationUpdateDTO implements ITranslationUpdateDTO {
  @IsNotEmpty()
  @IsString()
    fr: string;
}
