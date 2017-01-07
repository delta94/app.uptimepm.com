import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { RouteComponentProps } from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader';
import { camelCaseIdToDash } from 'helpers/utils';
import { ServiceInterval, useServiceIntervalsQuery, ServiceIntervalsDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';

interface ServiceIntervalListProps extends RouteComponentProps<any> {}

export const ServiceIntervalList = (props: ServiceIntervalListProps) => {
  const onAdd = () => {
    props.history.push('/client/service-intervals/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/client/${camelCaseIdToDash(id)}`, { id });
  };

  const columns: ColumnProps<ServiceInterval>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Operating Hours',
      dataIndex: 'operatingHours',
      key: 'operatingHours'
    }
  ];

  return (
    <React.Fragment>
      <ContainerHeader
        title="Service Intervals"
        subheading="An Administration view of all Service Intervals."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Service Interval
          </Button>
        }
      />

      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useServiceIntervalsQuery}
        queryDocument={ServiceIntervalsDocument}
        name="serviceIntervals"
        paginationTotalTitle="Service Intervals"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Service Intervals']}
      />
    </React.Fragment>
  );
};

export default ServiceIntervalList;
