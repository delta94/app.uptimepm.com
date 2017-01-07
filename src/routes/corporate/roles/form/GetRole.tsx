import React from 'react';
import { Query } from 'react-apollo';
import LoadingSpinner from 'components/LoadingSpinner';
import { GET_ROLE_BY_ID, ROLE_PERMISSIONS } from '../role.queries';
import { SaveRoleProps } from './';
import { Role, AvailablePermission } from 'generated/index';

interface GetRoleResponse {
  roleById: Role;
  rolePermissions: AvailablePermission[];
}

interface GetRolePermissionsResponse {
  rolePermissions: AvailablePermission[];
}

export default <P extends SaveRoleProps>(Component: React.ComponentType<SaveRoleProps>) => {
  class GetRole extends React.Component<P> {
    public render() {
      const id = this.props.location.state ? this.props.location.state.id : undefined;
      if (id) {
        return (
          <Query<GetRoleResponse> query={GET_ROLE_BY_ID} variables={{ id }} fetchPolicy="network-only">
            {({ loading, data, error }) => {
              if (loading) return <LoadingSpinner tip="Loading Role details..." />;
              if (error) return <div className="error">Error while fetching Role details </div>;
              if (!data) return <LoadingSpinner tip="Waiting Role Data..." />;
              // console.log('$$$$$$$$$ data', data);
              return <Component {...this.props} role={data.roleById} permissions={data.rolePermissions} />;
            }}
          </Query>
        );
      } else {
        return (
          <Query<GetRolePermissionsResponse> query={ROLE_PERMISSIONS} fetchPolicy="network-only">
            {({ loading, data, error }) => {
              if (loading) return <LoadingSpinner tip="Loading Role details..." />;
              if (error) return <div className="error">Error while fetching Role details </div>;
              if (!data) return <LoadingSpinner tip="Waiting Role Data..." />;
              // console.log('data', data.rolePermissions);
              return <Component {...this.props} permissions={data.rolePermissions} />;
            }}
          </Query>
        );
      }
    }
  }
  return GetRole;
};
