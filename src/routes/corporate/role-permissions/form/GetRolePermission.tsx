import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveRolePermissionProps } from '.';
import { useRolePermissionByIdQuery } from 'generated';

export default <P extends SaveRolePermissionProps>(Component: React.ComponentType<SaveRolePermissionProps>) => {
  const GetRolePermission = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useRolePermissionByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading Role Permission Details..." />;
    if (error) return <div className="error">Error while fetching Role Permission details </div>;
    if (!id) return <Component {...props} rolePermission={{ privileges: [] }} />;
    return <Component {...props} rolePermission={data!.rolePermissionById} />;
  };
  return GetRolePermission;
};
