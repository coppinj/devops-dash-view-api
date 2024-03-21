import { EntityWithSchema, TextColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';

@EntityWithSchema('public.translations')
export class Translation extends AbstractEntity<Translation> {
  @TextColumn('fr', true)
  fr: string;

  @TextColumn('en', true)
  en: string;
}
