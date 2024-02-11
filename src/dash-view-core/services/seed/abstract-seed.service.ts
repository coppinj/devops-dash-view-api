import { ISeedDTO } from '@dash-view-common';
import { Repository } from 'typeorm';
import { AbstractEntity } from '../../model';
import { AbstractCRUDService } from '../common';

export abstract class AbstractSeedService<TEntity extends AbstractEntity<TEntity>> {
  protected constructor(
    protected readonly repo: Repository<TEntity>,
    protected readonly service?: AbstractCRUDService<TEntity>,
  ) {
  }

  protected abstract getEntities(): Promise<TEntity[]>;

  async seed(): Promise<ISeedDTO> {
    const response: ISeedDTO = {
      code: this.getCode(),
      created: 0,
      updated: 0,
      deleted: 0,
    };

    const entities = await this.getEntities();

    for (const entity of entities) {
      if (await this.entityExists(entity)) {
        response.updated++;
      }
      else {
        response.created++;

        await this.repo.save(entity);
      }
    }

    return response;
  }

  protected async entityExists(_entity: TEntity): Promise<boolean> {
    return false;
  }

  protected getCode(): string {
    let name = this.constructor.name
      .replace('SeedService', '')
      .replaceAll(/([a-z])([A-Z])/g, (_, a: string, b: string) => `${a}-${b.toLowerCase()}`);

    if (name.endsWith('e')) {
      name += 's';
    }
    else if (name.endsWith('y')) {
      name = name.substring(0, name.length - 1) + 'ies';
    }
    else if (name.endsWith('s')) {

    }

    name = name[0].toUpperCase() + name.substring(1);

    return name;
  }
}
