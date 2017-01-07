import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveMakeProps } from '.';
import { useMakeByIdQuery } from 'generated';

export default <P extends SaveMakeProps>(Component: React.ComponentType<SaveMakeProps>) => {
  const GetMake = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useMakeByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching details </div>;
    if (!id) return <Component {...props} equipment={{}} />;
    return <Component {...props} make={data!.makeById} />;
  };
  return GetMake;
};
