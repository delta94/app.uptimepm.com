import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { IProps } from '.';
import { useNotificationByIdQuery } from 'generated';

export default <P extends IProps>(Component: React.ComponentType<IProps>) => {
  const GetNotification = (props: P) => {
    // console.log(props.location);
    let id = props.location.state ? props.location.state.id : undefined;
    if (!id) id = 'Notifications/' + props.match.params.id;
    const { loading, data, error } = useNotificationByIdQuery({ variables: { id }, skip: !id, fetchPolicy: 'network-only' });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching details </div>;
    if (!id) return <Component {...props} notification={{}} />;
    return <Component {...props} notification={data!.notificationById} />;
  };
  return GetNotification;
};
