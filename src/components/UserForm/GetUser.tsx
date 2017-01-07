import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveUserProps } from '.';
import { useUsersByIdQuery } from 'generated';

export default <P extends SaveUserProps>(Component: React.ComponentType<SaveUserProps>) => {
  const GetUser = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useUsersByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading user details..." />;
    if (error) return <div className="error">Error while fetching user details </div>;
    if (!id) return <Component {...props} user={{}} />;
    return <Component {...props} user={data!.userById} />;
  };
  return GetUser;
};
