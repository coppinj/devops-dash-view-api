import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IAbstractEntity, IAbstractEntityDTO } from '../interfaces';

export abstract class AbstractEntity<TEntity extends IAbstractEntity> implements IAbstractEntityDTO {
  @PrimaryGeneratedColumn('identity')
    id: number;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  constructor(partial?: Partial<TEntity>) {
    Object.assign(this, partial);
  }

  toIEntityDTO(): IAbstractEntityDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
