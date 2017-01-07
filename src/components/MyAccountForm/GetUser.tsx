import React, { useContext } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveUserProps } from '.';
import { useUsersByIdQuery } from 'generated';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

export default <P extends SaveUserProps>(Component: React.ComponentType<SaveUserProps>) => {
  const GetUser = (props: P) => {
    // Get id from useContext for logged in user
    const userContext = useContext(CurrentUserContext);
    const id = userContext && userContext.user.id ? (userContext.user.id as any) : undefined;
    const { loading, data, error } = useUsersByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading user details..." />;
    if (error) return <div className="error">Error while fetching user details </div>;
    if (!id) return <Component {...props} user={{}} />;
    return <Component {...props} user={data!.userById} />;
  };
  return GetUser;
};
