import React, { Suspense, LazyExoticComponent } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import LoadingSpinner from 'components/LoadingSpinner';

export default (Component: LazyExoticComponent<any>) => {
  return (props: any) => (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner tip="Loading..." />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};
