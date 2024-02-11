import { ICreateDTO, IEntityDTO, IListDTO, IReadDTO, IUpdateDTO } from '@dash-view-common';
import { AbstractEntity } from '../model';
import { AbstractCRUDService } from '../services';

export abstract class AbstractController<
  TEntity extends AbstractEntity<TEntity>,
  TReadDTO extends IReadDTO = any,
  TListDTO extends IListDTO = any,
  TCreateDTO extends ICreateDTO = any,
  TUpdateDTO extends IUpdateDTO = any> {
  protected constructor(
    protected readonly service: AbstractCRUDService<TEntity, TReadDTO, TListDTO, TCreateDTO, TUpdateDTO>,
  ) {
  }

  protected _create(dto: TCreateDTO): Promise<IEntityDTO>;
  protected _create(dto: TCreateDTO, parentID: number): Promise<IEntityDTO>;
  protected async _create(dto: TCreateDTO, parentID?: number): Promise<IEntityDTO> {
    return await this.service.create(dto, parentID);
  }

  protected _delete(id: number): Promise<void>;
  protected _delete(id: number, parentID: number): Promise<void>;
  protected async _delete(id: number, parentID?: number): Promise<void> {
    return await this.service.delete(id, parentID);
  }

  protected _list(): Promise<IListDTO[]>;
  protected _list(parentID: number): Promise<IListDTO[]>;
  protected async _list(parentID?: number): Promise<IListDTO[]> {
    return await this.service.list(parentID);
  }

  protected _read(id: number): Promise<IReadDTO>;
  protected _read(id: number, parentID: number): Promise<IReadDTO>;
  protected async _read(id: number, parentID?: number): Promise<IReadDTO> {
    return await this.service.read(id, parentID);
  }

  protected _update(id: number, dto: TUpdateDTO): Promise<IEntityDTO>;
  protected _update(id: number, dto: TUpdateDTO, parentID: number): Promise<IEntityDTO>;

  protected async _update(id: number, dto: TUpdateDTO, parentID?: number): Promise<IEntityDTO> {
    return await this.service.update(id, dto, parentID);
  }
}
