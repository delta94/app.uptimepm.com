/* Access component can be used for access control in an application.
  The properties 'name' and 'permissions' decide the access of the wrapped components based on user's role and permissions
  e.g.
  <Access permission="Users" privileges={['Add', 'Edit', 'Delete']}>
    <PrivateRoute exact path="/users" isLoggedIn={isLoggedIn} component={UserList} />
  </Access>
  Here route with path "/users" will only be rendered for the user with to user with permission name 'Users' and privileges 'Add or Edit or Delete'
  Few components in antd like Menu.Item does not allow to use any other wrapping component.
  In that case We can use directly allowed method
  e.g.
  {allowed('Users', ['Add', 'Edit', 'Delete']) ? (<Menu.Item>Users</Menu.Item>): null}
  Navigation item 'Users' is only accessible/visible to the user with given permissions
*/

import React from 'react';
import { CurrentUserConsumer, ICurrentUserContext } from 'contexts/CurrentUserContext';
import { findIndex, some, forEach } from 'lodash';
import { UserRoleReference, LoggedInUser, UserRolePermission, RoleTypeEnum } from 'generated/index';

interface AccessProps {
  children: React.ReactNode;
  roles?: string[];
  roleType?: RoleTypeEnum;
  permissions?: string[];
  privilege?: string;
}

const returnFalse = (
  requiredRoles: string[] | undefined,
  requiredPermissions: string[] | undefined,
  requiredPrivilege: string | undefined,
  userRoles: UserRoleReference[] | undefined
) => {
  // console.log('requiredRoles, requiredPermissions, requiredPrivilege, userRoles', requiredRoles, requiredPermissions, requiredPrivilege, userRoles, false);
  return false;
};

export const allowed = (
  user: Partial<LoggedInUser> | undefined,
  requiredRoles: string[] | undefined,
  requiredRoleType: RoleTypeEnum | undefined,
  requiredPermissions: string[] | undefined,
  requiredPrivilege: string | undefined
): boolean => {
  const roles = user && user.roles ? user.roles : undefined;
  if (!roles) return false;

  let hasRequiredRole: boolean = false;
  let hasRequiredPermission: boolean = false;
  let hasRequiredPrivilege: boolean = false;

  const userRoles: UserRoleReference[] = [];
  const userPermissions: UserRolePermission[] = [];

  // Find the role if supplied
  if (requiredRoles && requiredRoleType) {
    roles.map(roleItem => {
      // console.log('roleItem', roleItem.type, requiredRoleType, requiredRoleType === roleItem.type);
      const foundRoleIndex = findIndex(requiredRoles, requiredRole => {
        return requiredRole === roleItem.name && requiredRoleType === roleItem.type;
      });

      if (foundRoleIndex >= 0) {
        hasRequiredRole = true;
        userRoles.push(roleItem);
      }
      return null;
    });
    if (userRoles.length === 0) return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
  } else hasRequiredRole = true;
  // console.log('hasRequiredRole', hasRequiredRole);

  // Find the permission if supplied
  if (requiredPermissions) {
    if (requiredRoles && userRoles.length === 0) return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
    if (userRoles.length > 0) {
      userRoles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
        return null;
      });
      if (userPermissions.length === 0) return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
    } else {
      roles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
        return null;
      });
      if (userPermissions.length === 0) return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
    }
    hasRequiredPermission = true;
  } else hasRequiredPermission = true;
  // console.log('hasRequiredPermission', hasRequiredPermission);

  // Find the privilege if supplied
  if (requiredPrivilege) {
    if (requiredRoles && userRoles.length === 0) return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
    if (requiredPermissions && userPermissions.length === 0) return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
    forEach(userPermissions, userPermissionItem => {
      const found = some(userPermissionItem.privileges, privilege => {
        return privilege === requiredPrivilege;
      });
      if (found) {
        hasRequiredPrivilege = true;
        // return returnFalse(requiredRoles, requiredPermissions, requiredPrivilege, roles);
      }
    });
  } else hasRequiredPrivilege = true;
  // console.log('hasRequiredPrivilege', hasRequiredPrivilege);

  // console.log(
  //   'hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege',
  //   requiredRoles,
  //   hasRequiredRole,
  //   requiredPermissions,
  //   hasRequiredPermission,
  //   requiredPrivilege,
  //   hasRequiredPrivilege
  // );
  const result = hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege;
  // console.log('result', result);
  return result;
};

export const allowedWithAnyPrivileges = (
  user: Partial<LoggedInUser> | undefined,
  requiredRoles: string[] | undefined,
  requiredRoleType: RoleTypeEnum | undefined,
  requiredPermissions: string[] | undefined,
  requireAnyPrivilege: string[] | undefined
): boolean => {
  const roles = user && user.roles ? user.roles : undefined;
  if (!roles) return false;

  let hasRequiredRole: boolean = false;
  let hasRequiredPermission: boolean = false;
  let hasRequiredPrivilege: boolean = false;

  const userRoles: UserRoleReference[] = [];
  const userPermissions: UserRolePermission[] = [];

  // Find the role if supplied
  if (requiredRoles && requiredRoleType) {
    roles.map(roleItem => {
      // console.log('roleItem', roleItem.type, requiredRoleType, requiredRoleType === roleItem.type);
      const foundRoleIndex = findIndex(requiredRoles, requiredRole => {
        return requiredRole === roleItem.name && requiredRoleType === roleItem.type;
      });

      if (foundRoleIndex >= 0) {
        hasRequiredRole = true;
        userRoles.push(roleItem);
      }
      return null;
    });
    if (userRoles.length === 0) return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
  } else hasRequiredRole = true;
  // console.log('hasRequiredRole', hasRequiredRole);

  // Find the permission if supplied
  if (requiredPermissions) {
    if (requiredRoles && userRoles.length === 0) return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
    if (userRoles.length > 0) {
      userRoles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
        return null;
      });
      if (userPermissions.length === 0) return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
    } else {
      roles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
        return null;
      });
      if (userPermissions.length === 0) return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
    }
    hasRequiredPermission = true;
  } else hasRequiredPermission = true;
  // console.log('hasRequiredPermission', hasRequiredPermission);

  // Find the privilege if supplied
  if (requireAnyPrivilege) {
    if (requiredRoles && userRoles.length === 0) return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
    if (requiredPermissions && userPermissions.length === 0) return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
    forEach(userPermissions, userPermissionItem => {
      const found = some(userPermissionItem.privileges, privilege => {
        return some(requireAnyPrivilege, rp => rp === privilege);
      });
      if (found) {
        hasRequiredPrivilege = true;
        return returnFalse(requiredRoles, requiredPermissions, undefined, roles);
      }
    });
  } else hasRequiredPrivilege = true;
  // console.log('hasRequiredPrivilege', hasRequiredPrivilege);

  // console.log(
  //   'hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege',
  //   requiredRoles,
  //   hasRequiredRole,
  //   requiredPermissions,
  //   hasRequiredPermission,
  //   requiredPrivilege,
  //   hasRequiredPrivilege
  // );
  const result = hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege;
  // console.log('result', result);
  return result;
};

const Access: React.FC<AccessProps> = ({ children, roles, roleType, permissions, privilege }) => {
  return (
    <CurrentUserConsumer>
      {(userContext: ICurrentUserContext) => {
        // console.log('[ACCESS]', roles, permissions, privilege);
        if (allowed(userContext.user, roles, roleType, permissions, privilege)) {
          return <>{children}</>;
        } else {
          // console.log('[ACCESS DENIED]', roles, permissions, privilege);
          return '';
        }
      }}
    </CurrentUserConsumer>
  );
};

export default Access;
