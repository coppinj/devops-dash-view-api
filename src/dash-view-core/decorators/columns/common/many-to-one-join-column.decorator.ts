import { JoinColumn } from 'typeorm';

export function ManyToOneJoinColumn(name: string, referencedColumnName: string = 'id'): PropertyDecorator {
  return JoinColumn({
    name,
    referencedColumnName,
  });
}