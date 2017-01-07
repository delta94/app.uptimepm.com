import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveJobProps } from '.';
import { useJobByIdQuery } from 'generated';

export default <P extends SaveJobProps>(Component: React.ComponentType<SaveJobProps>) => {
  const GetJob = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useJobByIdQuery({ variables: { id }, skip: !id, fetchPolicy: 'network-only' });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching details </div>;
    if (!id) return <Component {...props} job={{}} />;
    return <Component {...props} job={data!.jobById} />;
  };
  return GetJob;
};
