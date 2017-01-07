import { UserRoleReference } from 'generated/index';

export interface IUserClientRoleReference {
  id: string;
  name: string;
  classification: string;
  roles: UserRoleReference[];
}
