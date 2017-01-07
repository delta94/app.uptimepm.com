import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveClientProps } from './';
import { useClientByIdQuery } from 'generated/index';

export default <P extends SaveClientProps>(Component: React.ComponentType<SaveClientProps>) => {
  const GetClient = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useClientByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading Client details..." />;
    if (error) return <div className="error">Error while fetching Client details </div>;
    if (!id) return <Component {...props} client={{}} locations={[]} />;
    return <Component {...props} client={data!.clientById} />;
  };
  return GetClient;
};
