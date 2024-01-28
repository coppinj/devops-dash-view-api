import { BooleanColumn, EmailColumn, EntityWithSchema, ManyToOne, VarcharColumn } from '../../decorators';
import { AbstractEntity } from './abstract.entity';
import { Role } from './role.entity';

@EntityWithSchema('public.users')
export class User extends AbstractEntity<User> {
  @EmailColumn('email', false, true)
    email: string;

  @VarcharColumn('password', false)
    password: string;
  plainPassword?: string;

  @BooleanColumn('active', false, true)
    active: boolean;

  @ManyToOne(() => User, () => Role, 'role_id', 'roleID', false)
    role: Role;
  roleID: number;
}
