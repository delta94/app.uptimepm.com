import React, { Fragment } from 'react';
import { CurrentUserConsumer, ICurrentUserContext } from 'contexts/CurrentUserContext';
import { allowed } from './routeUtils';

interface AccessProps {
  children: React.ReactNode;
  roles?: string[];
  permissions?: string[]; // Change the required prop to an optional prop.
  privilege?: string;
}

const AllowedAccess: React.SFC<AccessProps> = ({ children, roles, permissions, privilege }) => {
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

export default AllowedAccess;
