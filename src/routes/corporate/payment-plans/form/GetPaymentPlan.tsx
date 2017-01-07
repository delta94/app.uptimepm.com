import React from 'react';
import { Query } from 'react-apollo';
import LoadingSpinner from 'components/LoadingSpinner';
import { GET_PAY_BY_ID } from '../pay.queries';
import { SavePaymentPlanProps } from '../form';

export default <P extends SavePaymentPlanProps>(Component: React.ComponentType<SavePaymentPlanProps>) => {
  class GetEquipmentPaymentPlan extends React.Component<P> {
    public render() {
      const id = this.props.location.state ? this.props.location.state.id : undefined;
      if (id) {
        return (
          <Query<any, any> query={GET_PAY_BY_ID} variables={{ id }}>
            {({ loading, data, error }) => {
              if (loading) return <LoadingSpinner tip="Loading payment plan details..." />;
              if (error) return <div className="error">Error while fetching payment plan details </div>;
              return <Component {...this.props} paymentPlan={data.paymentPlanById} />;
            }}
          </Query>
        );
      } else {
        return <Component {...this.props} />;
      }
    }
  }
  return GetEquipmentPaymentPlan;
};
