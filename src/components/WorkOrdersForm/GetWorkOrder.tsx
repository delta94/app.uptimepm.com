import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { IProps } from '.';
import { useWorkOrderByIdQuery } from 'generated';

export default <P extends IProps>(Component: React.ComponentType<IProps>) => {
  const GetWorkOrder = (props: P) => {
    let id = props.location.state ? props.location.state.id : undefined;
    if (!id) id = 'WorkOrders/' + props.match.params.id;
    const { loading, data, error } = useWorkOrderByIdQuery({ variables: { id }, skip: !id, fetchPolicy: 'network-only' });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching details </div>;
    if (!id) return <Component {...props} workOrder={{}} />;
    return <Component {...props} workOrder={data!.workOrderById} />;
  };
  return GetWorkOrder;
};
