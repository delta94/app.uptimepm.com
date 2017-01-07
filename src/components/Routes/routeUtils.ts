import { ICurrentUserContext } from 'contexts/CurrentUserContext';
import { find, findIndex, forEach, some } from 'lodash';
import { omitDeep } from 'omit-deep-lodash';
import { LoggedInUser, UserRoleReference, UserRolePermission } from 'generated';

export class RouteUtils {
  allowed = (
    user: Partial<LoggedInUser> | undefined,
    requiredRoles: string[] | undefined,
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
    if (requiredRoles) {
      roles.map(roleItem => {
        const foundRoleIndex = findIndex(requiredRoles, requiredRole => {
          return requiredRole === roleItem.name;
        });

        if (foundRoleIndex >= 0) {
          hasRequiredRole = true;
          userRoles.push(roleItem);
        }
      });
      if (userRoles.length === 0) return false;
    } else hasRequiredRole = true;

    // Find the permission if supplied
    if (requiredPermissions) {
      if (requiredRoles && userRoles.length === 0) return false;
      if (userRoles.length > 0) {
        userRoles.map(roleItem => {
          const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
            return some(requiredPermissions, rp => rp === permission.name);
          });

          if (foundPermissionIndex >= 0) {
            hasRequiredRole = true;
            userPermissions.push(roleItem.permissions[foundPermissionIndex]);
          }
        });
        if (userPermissions.length === 0) return false;
      } else {
        roles.map(roleItem => {
          const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
            return some(requiredPermissions, rp => rp === permission.name);
          });

          if (foundPermissionIndex >= 0) {
            hasRequiredRole = true;
            userPermissions.push(roleItem.permissions[foundPermissionIndex]);
          }
        });
        if (userPermissions.length === 0) return false;
      }
      hasRequiredPermission = true;
    } else hasRequiredPermission = true;

    // Find the privilege if supplied
    if (requiredPrivilege) {
      if (requiredRoles && userRoles.length === 0) return false;
      if (requiredPermissions && userPermissions.length === 0) return false;
      forEach(userPermissions, userPermissionItem => {
        const found = some(userPermissionItem.privileges, privilege => {
          return privilege === requiredPrivilege;
        });
        if (found) {
          hasRequiredPrivilege = true;
          return false;
        }
      });
    } else hasRequiredPrivilege = true;

    // console.log('hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege', hasRequiredRole, hasRequiredPermission, hasRequiredPrivilege);
    return hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege;
  };
}

export const allowedRoles = (userContext: ICurrentUserContext, requiredRoles: string[]): boolean => {
  const userRoles = userContext.user && userContext.user.roles ? userContext.user.roles : [];
  let hasRole: boolean = false;
  forEach(userRoles, roleItem => {
    if (
      some(requiredRoles, userRole => {
        return userRole === roleItem.name;
      })
    ) {
      hasRole = true;
      return false;
    }
  });
  return hasRole;
};

export const allowedPermissions = (userContext: ICurrentUserContext, requiredPermissions: string[], requiredRoles?: string[]) => {
  let hasRequiredRole: boolean = false;
  let hasRequiredPermission: boolean = false;

  const userRoles: UserRoleReference[] = [];
  const userPermissions: UserRolePermission[] = [];
  // console.log('requiredPermissions and requiredRoles', requiredPermissions, requiredRoles);
  // Find the role if supplied
  const roles = userContext.user && userContext.user.roles ? userContext.user.roles : [];
  if (requiredRoles) {
    roles.map(roleItem => {
      const foundRoleIndex = findIndex(requiredRoles, requiredRole => {
        return requiredRole === roleItem.name;
      });

      if (foundRoleIndex >= 0) {
        hasRequiredRole = true;
        userRoles.push(roleItem);
      }
    });
    if (!userRoles.length) return false;
  } else hasRequiredRole = true;

  // console.log('has required role', hasRequiredRole);

  if (requiredPermissions) {
    if (!userRoles.length) {
      roles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
      });
      if (!userPermissions.length) return false;
    } else {
      userRoles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
      });
      if (!userPermissions.length) return false;
    }
    hasRequiredPermission = true;
  } else hasRequiredPermission = true;

  // console.log('hasPermission', hasRequiredPermission, requiredPermissions);
  return hasRequiredRole && hasRequiredPermission;
};

export const allowed = (
  userContext: ICurrentUserContext,
  requiredRoles: string[] | undefined,
  requiredPermissions: string[] | undefined,
  requiredPrivilege: string | undefined
): boolean => {
  const roles = userContext.user && userContext.user.roles ? userContext.user.roles : [];
  if (!roles) return false;

  let hasRequiredRole: boolean = false;
  let hasRequiredPermission: boolean = false;
  let hasRequiredPrivilege: boolean = false;

  const userRoles: UserRoleReference[] = [];
  const userPermissions: UserRolePermission[] = [];

  // Find the role if supplied
  if (requiredRoles) {
    roles.map(roleItem => {
      const foundRoleIndex = findIndex(requiredRoles, requiredRole => {
        return requiredRole === roleItem.name;
      });

      if (foundRoleIndex >= 0) {
        hasRequiredRole = true;
        userRoles.push(roleItem);
      }
    });
    if (!userRoles.length) return false;
  } else hasRequiredRole = true;

  // Find the permission if supplied
  if (requiredPermissions) {
    if (!userRoles.length) {
      roles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
      });
      if (!userPermissions.length) return false;
    } else {
      userRoles.map(roleItem => {
        const foundPermissionIndex = findIndex(roleItem.permissions, permission => {
          return some(requiredPermissions, rp => rp === permission.name);
        });

        if (foundPermissionIndex >= 0) {
          hasRequiredRole = true;
          userPermissions.push(roleItem.permissions[foundPermissionIndex]);
        }
      });
      if (!userPermissions.length) return false;
    }
    hasRequiredPermission = true;
  } else hasRequiredPermission = true;

  // Find the privilege if supplied
  if (requiredPrivilege) {
    if (!userRoles.length) return false;
    if (!userPermissions.length) return false;
    forEach(userPermissions, userPermissionItem => {
      const found = some(userPermissionItem.privileges, privilege => {
        return privilege === requiredPrivilege;
      });
      if (found) {
        hasRequiredPrivilege = true;
        return false;
      }
    });
  } else hasRequiredPrivilege = true;

  return hasRequiredRole && hasRequiredPermission && hasRequiredPrivilege;
};
