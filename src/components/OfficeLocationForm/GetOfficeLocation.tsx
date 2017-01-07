import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { OfficeLocationProps } from '.';
import { useOfficeLocationByIdQuery } from 'generated';

export default <P extends OfficeLocationProps>(Component: React.ComponentType<OfficeLocationProps>) => {
  const GetOfficeLocation = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useOfficeLocationByIdQuery({ variables: { id }, skip: !id, fetchPolicy: 'cache-and-network' });
    // console.log('OfficeLocationData', data);
    if (loading) return <LoadingSpinner tip="Loading Office OfficeLocation Details..." />;
    if (error) return <div className="error">Error while fetching officeLocation details </div>;
    if (!id) return <Component {...props} officeLocation={{}} />;
    return <Component {...props} officeLocation={data!.officeLocationById} />;
  };
  return GetOfficeLocation;
};
