import { IEntityDTO } from '../../../dash-view-common/model/interfaces/entity/entity-dto.interface';

export interface IAbstractEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  toIEntityDTO(): IEntityDTO;
}
