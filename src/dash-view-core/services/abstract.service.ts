import { ICreateDTO, IEntityDTO, IListDTO, IReadDTO } from '@dash-view-common';
import { NotFoundException, NotImplementedException } from '@nestjs/common';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { AbstractEntity, IAbstractEntityDTO } from '../model';

export abstract class AbstractService<
  TEntity extends AbstractEntity<TEntity>,
  TReadDTO extends IReadDTO = any,
  TListDTO extends IListDTO = any,
  TCreateDTO extends ICreateDTO = any,
  TUpdateDTO extends ICreateDTO = any,
> {
  protected constructor(protected readonly repo: Repository<TEntity>) {
  }

  async create(dto: TCreateDTO): Promise<IEntityDTO> {
    const entity = this.repo.create(dto as unknown as DeepPartial<TEntity>);

    return this.transaction(async em => {
      await this._updateCreateProperties(em, entity, dto);

      return await this.saveAndGetEntity(em, entity);
    });
  }

  async findOneOrNull(id: number): Promise<TEntity | null> {
    return (await this.repo.findOne({
      where: {
        id,
      } as FindOptionsWhere<TEntity>,
    })) ?? null;
  }

  async findOneOrNotFound(id: number): Promise<TEntity | null> {
    const entity = await this.findOneOrNull(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async read(id: number): Promise<TReadDTO> {
    const entity = await this.findOneOrNotFound(id);

    return this._getReadDTO(entity);
  }

  saveAndGetEntity(entity: TEntity): Promise<IEntityDTO>;
  saveAndGetEntity(em: EntityManager, entity: TEntity): Promise<IEntityDTO>;

  async saveAndGetEntity(entityOrEm: TEntity | EntityManager, entity?: TEntity): Promise<IAbstractEntityDTO> {
    const manager = entityOrEm instanceof EntityManager ? entityOrEm : this.repo.manager;

    await manager.save(entity ?? entityOrEm);

    return entity.toIEntityDTO();
  }

  async update(id: number, dto: TUpdateDTO): Promise<IEntityDTO> {
    const entity = await this.findOneOrNotFound(id);

    return this.transaction(async em => {
      this.repo.merge(entity, dto as unknown as DeepPartial<TEntity>);

      await this._updateUpdateProperties(em, entity, dto);

      return await this.saveAndGetEntity(em, entity);
    });
  }

  getRepository(): Repository<TEntity> {
    return this.repo;
  }

  protected transaction<TResult>(runInTransaction: (entityManager: EntityManager) => Promise<TResult>): Promise<TResult> {
    return this.repo.manager.transaction(runInTransaction);
  }

  protected _getReadDTO(_entity: TEntity): Promise<TReadDTO> {
    throw new NotImplementedException();
  }

  protected async _updateCreateProperties(_em: EntityManager, _entity: TEntity, _dto: TCreateDTO): Promise<void> {

  }

  protected async _updateUpdateProperties(_em: EntityManager, _entity: TEntity, _dto: TUpdateDTO): Promise<void> {

  }
}
