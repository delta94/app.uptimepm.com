import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveEquipmentProps } from '.';
import { useEquipmentByIdQuery } from 'generated';

export default <P extends SaveEquipmentProps>(Component: React.ComponentType<SaveEquipmentProps>) => {
  const GetEquipment = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useEquipmentByIdQuery({ variables: { id }, skip: !id });
    // console.log('Equipment', data);
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching Client details </div>;
    if (!id) return <Component {...props} equipment={{}} />;
    return <Component {...props} equipment={data!.equipmentById} />;
  };
  return GetEquipment;
};
