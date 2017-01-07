import gql from 'graphql-tag';

export const GET_PAYMENT_PLANS = gql`
  query($skip: Int!, $pageSize: Int!, $searchText: String) {
    paymentPlans(skip: $skip, pageSize: $pageSize, searchText: $searchText) {
      paymentPlans {
        id
        name
        minimumUsers
        maximumUsers
        pricePerUser
        onboardingFeePerUser
        maintenanceFee
        createdOn
        updatedOn
      }
      totalRows
    }
  }
`;

export const GET_PAY_BY_ID = gql`
  query($id: String!) {
    paymentPlanById(id: $id) {
      id
      name
      minimumUsers
      maximumUsers
      pricePerUser
      onboardingFeePerUser
      billingPeriod
      maintenanceFee
      discountAmount
      discountType
      createdOn
      updatedOn
    }
  }
`;
