import { Button } from 'antd';
import React from 'react';
import { withApollo, WithApolloClient } from 'react-apollo';
// import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import ApolloClient from 'apollo-client';
// import { PaymentPlan } from 'generated';

interface PaymentPlanListProps extends RouteComponentProps<any> {
  client: ApolloClient<any>;
}

export const PaymentPlanList = (props: WithApolloClient<PaymentPlanListProps>) => {
  const onAdd = () => {
    props.history.push('/corporate/paymentPlans/add');
  };

  // const onEdit = (id: string) => {
  //   props.history.push(`/corporate/${id}`, { id });
  // };

  // Columns of the table
  // const columns: ColumnProps<PaymentPlan>[] = [
  //   // {
  //   //   title: 'Id',
  //   //   dataIndex: 'id',
  //   //   key: 'id',
  //   // },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name'
  //   },
  //   {
  //     title: 'Min User',
  //     dataIndex: 'minimumUsers',
  //     key: 'minimumUsers'
  //   },
  //   {
  //     title: 'Max User',
  //     dataIndex: 'maximumUsers',
  //     key: 'maximumUsers'
  //   },
  //   {
  //     title: 'Price per User',
  //     dataIndex: 'pricePerUser',
  //     key: 'pricePerUser'
  //   },
  //   {
  //     title: 'Onboarding fee per User',
  //     dataIndex: 'onboardingFeePerUser',
  //     key: 'onboardingFeePerUser'
  //   },
  //   {
  //     title: 'Maintenance fee',
  //     dataIndex: 'maintenanceFee',
  //     key: 'maintenanceFee'
  //   }
  // ];

  return (
    <>
      <ContainerHeader
        title="Payment Plans"
        subheading="An Administration view of all pay plans."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Payment Plan
          </Button>
        }
      />
      {/* <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={usePaymentPlanQuery}
        queryDocument={PaymentPlanDocument}
        name="roles"
        paginationTotalTitle="Roles"

        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Payment Plans']}
      /> */}
    </>
  );
};

export default withApollo<WithApolloClient<PaymentPlanListProps>>(PaymentPlanList);
