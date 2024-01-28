import { IEntityDTO } from '@dash-view-common';

export abstract class CommonDTO implements IEntityDTO {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
