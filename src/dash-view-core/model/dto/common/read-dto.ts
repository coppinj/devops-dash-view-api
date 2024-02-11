import { IReadDTO } from '@dash-view-common';

export abstract class ReadDTO implements IReadDTO {
  id: number;

  constructor(entity?: Partial<ReadDTO>) {
    if (entity) {
      Object.assign(this, entity);
    }

    this.id = entity.id;
  }
}