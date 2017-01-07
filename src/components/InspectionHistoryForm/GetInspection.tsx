import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { useInspectionByIdQuery } from 'generated';
import { SaveInspectionProps } from '.';

export default <P extends SaveInspectionProps>(Component: React.ComponentType<SaveInspectionProps>) => {
  const GetClient = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useInspectionByIdQuery({ variables: { id }, skip: !id, fetchPolicy: 'network-only' });
    if (loading) return <LoadingSpinner tip="Loading Inspection details..." />;
    if (error) return <div className="error">Error while fetching Inspection details </div>;
    if (!id) return <Component {...props} inspection={{}} />;
    return <Component {...props} inspection={data!.inspectionById} />;
  };
  return GetClient;
};
