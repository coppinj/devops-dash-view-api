import { IListDTO } from '@dash-view-common';

export abstract class ListDTO implements IListDTO {
  rowID: number;

  constructor(item?: Partial<any>) {
    if (item) {
      for (const [prop, value] of Object.entries(item)) {
        if (this.hasOwnProperty(prop)) {
          this[prop] = value;
        }
      }
    }
  }
}