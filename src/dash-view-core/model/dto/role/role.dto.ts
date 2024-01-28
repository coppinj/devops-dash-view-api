import { IRoleDTO, RoleType } from '@dash-view-common';
import { CommonDTO } from '../common';

export class RoleDTO extends CommonDTO implements IRoleDTO {
  role: RoleType;
}