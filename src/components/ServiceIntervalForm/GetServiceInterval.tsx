import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveServiceIntervalProps } from '.';
import { useServiceIntervalByIdQuery } from 'generated';

export default <P extends SaveServiceIntervalProps>(Component: React.ComponentType<SaveServiceIntervalProps>) => {
  const GetServiceInterval = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useServiceIntervalByIdQuery({ variables: { id }, skip: !id, fetchPolicy: 'network-only' });
    if (loading) return <LoadingSpinner tip="Loading service interval details..." />;
    if (error) return <div className="error">Error while fetching service interval details </div>;
    if (!id) return <Component {...props} equipment={{}} />;
    return <Component {...props} serviceInterval={data!.serviceIntervalById} />;
  };
  return GetServiceInterval;
};
