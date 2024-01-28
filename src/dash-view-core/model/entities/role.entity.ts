import { RoleType } from '@dash-view-common';
import { EntityWithSchema, EnumColumn, ManyToOne } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Translation } from './translation.entity';

@EntityWithSchema('public.roles')
export class Role extends AbstractEntity<Role> {
  @EnumColumn('role', RoleType, false, { unique: true })
    role: RoleType;

  @ManyToOne(() => Role, () => Translation, 'label_id', 'labelID', false)
    label: Translation;
  labelID: number;
}
