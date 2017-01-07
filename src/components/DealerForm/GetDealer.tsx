import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveDealerProps } from '.';
import { useDealerByIdQuery } from 'generated';

export default <P extends SaveDealerProps>(Component: React.ComponentType<SaveDealerProps>) => {
  const GetDealer = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useDealerByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading details..." />;
    if (error) return <div className="error">Error while fetching details </div>;
    if (!id) return <Component {...props} dealer={{ location: {}, phones: [] }} />;
    return <Component {...props} dealer={data!.dealerById} />;
  };
  return GetDealer;
};
