import { ITranslationReadDTO } from '@dash-view-common';
import { CommonDTO } from '../common';

export class TranslationReadDTO extends CommonDTO implements ITranslationReadDTO {
  fr: string;
}
