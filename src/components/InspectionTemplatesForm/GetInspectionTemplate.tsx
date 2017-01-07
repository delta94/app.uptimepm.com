import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import { SaveInspectionTemplateProps } from '.';
import { useInspectionTemplateByIdQuery } from 'generated';

export default <P extends SaveInspectionTemplateProps>(Component: React.ComponentType<SaveInspectionTemplateProps>) => {
  const GetInspectionTemplate = (props: P) => {
    const id = props.location.state ? props.location.state.id : undefined;
    const { loading, data, error } = useInspectionTemplateByIdQuery({ variables: { id }, skip: !id });
    if (loading) return <LoadingSpinner tip="Loading..." />;
    if (error) return <div className="error">Error while fetching details </div>;
    if (!id) return <Component {...props} />;
    return <Component {...props} inspectionTemplate={data!.inspectionTemplateById} />;
  };
  return GetInspectionTemplate;
};
