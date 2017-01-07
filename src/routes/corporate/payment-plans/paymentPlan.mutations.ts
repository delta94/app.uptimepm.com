import gql from 'graphql-tag';

export const SAVE_PAYMENT_PLAN = gql`
  mutation($paymentPlan: PaymentPlanInput!) {
    savePaymentPlan(paymentPlan: $paymentPlan) {
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
