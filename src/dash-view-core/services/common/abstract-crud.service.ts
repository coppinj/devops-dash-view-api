import { ICreateDTO, IEntityDTO, IListDTO, IReadDTO, IUpdateDTO } from '@dash-view-common';
import { NotFoundException, NotImplementedException } from '@nestjs/common';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { AbstractEntity, IAbstractEntityDTO } from '../../model';
import { AbstractService } from './abstract.service';

export abstract class AbstractCRUDService<
  TEntity extends AbstractEntity<TEntity>,
  TReadDTO extends IReadDTO = any,
  TListDTO extends IListDTO = any,
  TCreateDTO extends ICreateDTO = any,
  TUpdateDTO extends IUpdateDTO = any,
  TParent extends AbstractEntity<TParent> = any,
> extends AbstractService<TEntity> {
  get parentService(): AbstractService<TParent> {
    throw new NotImplementedException();
  }

  get parentProperty(): keyof TEntity {
    throw new NotImplementedException();
  }
  
  protected constructor(repo: Repository<TEntity>) {
    super(repo);
  }

  async create(dto: TCreateDTO): Promise<IEntityDTO>;
  async create(dto: TCreateDTO, parentID: number): Promise<IEntityDTO>;

  async create(dto: TCreateDTO, parentID?: number): Promise<IEntityDTO> {
    let parent = null;

    if (parentID) {
      parent = await this.parentService.getRepository().findOneOrFail({ where: { id: parentID } as FindOptionsWhere<TParent> });
    }

    const entity = this.repo.create(dto as unknown as DeepPartial<TEntity>);

    if (parent) {
      entity[this.parentProperty] = parent;
    }

    return this.transaction(async em => {
      await this._updateCreateProperties(em, entity, dto, parent);

      const savedEntity = await this.saveAndGetEntity(em, entity);

      await this._appendCreatePropertiesToResponse(em, savedEntity, entity);

      return savedEntity;
    });
  }

  async delete(id: number): Promise<void>;
  async delete(id: number, parentID: number): Promise<void>;

  async delete(id: number, parentID?: number): Promise<void> {
    const entity = await this.findOneOrNotFound(id, parentID);

    return this.transaction(async em => {
      await em.remove(entity);
    });
  }

  async findOneOrNull(id: number): Promise<TEntity | null>;
  async findOneOrNull(id: number, parentID: number): Promise<TEntity | null>;

  async findOneOrNull(id: number, parentID?: number): Promise<TEntity | null> {
    let whereOptions: FindOptionsWhere<TEntity> = {
      id,
    } as FindOptionsWhere<TEntity>;

    if (parentID) {
      whereOptions = {
        ...whereOptions,
        [this.parentProperty]: parentID,
      };
    }

    return (await this.repo.findOne({ where: whereOptions })) ?? null;
  }

  async findOneOrNotFound(id: number): Promise<TEntity | null>;
  async findOneOrNotFound(id: number, parentID: number): Promise<TEntity | null>;
  async findOneOrNotFound(id: number, parentID?: number): Promise<TEntity | null> {
    const entity = await this.findOneOrNull(id, parentID);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  async list(): Promise<TListDTO[]>;
  async list(parentID: number): Promise<TListDTO[]>;

  async list(parentID?: number): Promise<TListDTO[]> {
    const query = this._getListQuery(parentID);

    if (parentID) {
      if (!query.where) {
        query.where = {};
      }

      if (!query.where[this.parentProperty as any]) {
        query.where[this.parentProperty as any] = {
          id: parentID,
        };
      }
    }

    const entities = await this.repo.find(query);

    const items: TListDTO[] = [];

    for (const entity of entities) {
      const dto = await this._getListDTO(entity);

      dto.rowID = entity.id;

      items.push(dto);
    }

    return items;
  }

  async read(id: number): Promise<TReadDTO>;
  async read(id: number, parentID: number): Promise<TReadDTO>;
  async read(id: number, parentID?: number): Promise<TReadDTO> {
    const entity = await this.findOneOrNotFound(id, parentID);

    return this._getReadDTO(entity);
  }

  saveAndGetEntity(entity: TEntity): Promise<IEntityDTO>;
  saveAndGetEntity(em: EntityManager, entity: TEntity): Promise<IEntityDTO>;

  async saveAndGetEntity(entityOrEm: TEntity | EntityManager, entity?: TEntity): Promise<IAbstractEntityDTO> {
    const manager = entityOrEm instanceof EntityManager ? entityOrEm : this.repo.manager;

    await manager.save(entity ?? entityOrEm);

    return ((entity ?? entityOrEm) as TEntity).toIEntityDTO();
  }

  async update(id: number, dto: TUpdateDTO): Promise<IEntityDTO>;
  async update(id: number, dto: TUpdateDTO, parentID: number): Promise<IEntityDTO>;

  async update(id: number, dto: TUpdateDTO, parentID?: number): Promise<IEntityDTO> {
    let parent = null;

    if (parentID) {
      parent = await this.parentService.getRepository().findOneOrFail({ where: { id: parentID } as FindOptionsWhere<TParent> });
    }

    const entity = await this.findOneOrNotFound(id, parentID);

    return this.transaction(async em => {
      this.repo.merge(entity, dto as unknown as DeepPartial<TEntity>);

      await this._updateUpdateProperties(em, entity, dto, parent);

      return await this.saveAndGetEntity(em, entity);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async _appendCreatePropertiesToResponse(em: EntityManager, responseEntity: IEntityDTO, entity: TEntity): Promise<void> {
  }

  protected _getReadDTO(_entity: TEntity): Promise<TReadDTO> {
    throw new NotImplementedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _getListDTO(entity: TEntity): Promise<TListDTO> {
    throw new NotImplementedException();
  }

  protected _getListQuery(): FindManyOptions<TEntity>;
  protected _getListQuery(parentID: number): FindManyOptions<TEntity>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _getListQuery(parentID?: number): FindManyOptions<TEntity> {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async _updateCreateProperties(em: EntityManager, entity: TEntity, dto: TCreateDTO, parent?: TParent): Promise<void> {

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async _updateUpdateProperties(em: EntityManager, entity: TEntity, dto: TUpdateDTO, parent?: TParent): Promise<void> {

  }
}
