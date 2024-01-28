import { ICreateDTO, IEntityDTO, IListDTO, IReadDTO } from '@dash-view-common';
import { Body } from '@nestjs/common';
import { IntParam } from '../decorators';
import { AbstractEntity } from '../model';
import { AbstractService } from '../services';

export abstract class AbstractController<
  TEntity extends AbstractEntity<TEntity>,
  TReadDTO extends IReadDTO = any,
  TListDTO extends IListDTO = any,
  TCreateDTO extends ICreateDTO = any,
  TUpdateDTO extends ICreateDTO = any> {
  protected constructor(
    protected readonly service: AbstractService<TEntity, TReadDTO, TListDTO, TCreateDTO, TUpdateDTO>,
  ) {
  }

  protected async _create(@Body() dto: TCreateDTO): Promise<IEntityDTO> {
    return await this.service.create(dto);
  }

  protected async _read(@IntParam('id') id: number): Promise<IReadDTO> {
    return await this.service.read(id);
  }

  protected async _update(@IntParam('id') id: number, @Body() dto: TUpdateDTO): Promise<IEntityDTO> {
    return await this.service.update(id, dto);
  }
}
