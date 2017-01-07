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

import { CurrentUserConsumer, ICurrentUserContext } from 'contexts/CurrentUserContext';
import React, { Fragment } from 'react';
import { allowed, allowedRoles } from './routeUtils';

interface AccessProps {
  children: React.ReactNode;
  roles: string[];
  permissions: string[]; // Change the required prop to an optional prop.
  privilege: string;
}

const AllowedPrivilege: React.SFC<AccessProps> = ({ children, roles, permissions, privilege }) => {
  return (
    <CurrentUserConsumer>
      {(userContext: ICurrentUserContext) => {
        if (allowed(userContext, roles, permissions, privilege)) {
          return <Fragment>{children}</Fragment>;
        } else {
          return null;
        }
      }}
    </CurrentUserConsumer>
  );
};

export default AllowedPrivilege;
