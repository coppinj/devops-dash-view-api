import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Translation, TranslationCreateDTO, TranslationUpdateDTO } from '../model';
import { AbstractCRUDService } from './common';

@Injectable()
export class TranslationService extends AbstractCRUDService<Translation> {
  constructor(
    @InjectRepository(Translation)
      repo: Repository<Translation>,
  ) {
    super(repo);
  }

  async deleteUsingEm(em: EntityManager, id: number | null): Promise<void>;
  async deleteUsingEm(em: EntityManager, id: (number | null)[]): Promise<void>;

  async deleteUsingEm(em: EntityManager, idOrIds: number | null | (number | null)[]): Promise<void> {
    const ids = (Array.isArray(idOrIds) ? idOrIds : [idOrIds]).filter(x => x !== null && x !== undefined);

    if (ids.length === 0) {
      return;
    }

    await em.createQueryBuilder(Translation, 't')
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }

  async updateTranslation<TEntity>(em: EntityManager, entity: TEntity, translationDTO: TranslationCreateDTO | TranslationUpdateDTO | null, translationProperty: keyof TEntity, translationIDProperty: keyof TEntity): Promise<Translation> {
    const translationID: number | undefined | null = entity[translationIDProperty] as number;

    let translation: Translation;

    if (translationID) {
      translation = await em.findOne(Translation, {
        where: {
          id: translationID,
        },
      });

      if (!translationID) {
        throw new BadRequestException();
      }

      if (translationDTO === null) {
        entity[translationIDProperty] = null;
        entity[translationProperty] = null;

        await em.save(entity);

        await em.remove(translation);

        return;
      }

      entity[translationProperty as any] = translation;
    }
    else {
      if (!translationDTO) {
        return;
      }

      translation = new Translation();

      entity[translationProperty as any] = translation;
    }

    translation.fr = translationDTO.fr;

    await em.save(translation);

    return translation;
  }
}
