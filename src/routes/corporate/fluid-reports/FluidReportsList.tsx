import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { FluidReport, useFluidReportsQuery, FluidReportsDocument, DetailedEquipmentReference, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';
import { Link } from 'react-router-dom';
import moment from 'moment';
interface FluidsListProps extends RouteComponentProps<any> {}

export const FluidReportsList = (props: FluidsListProps) => {
  const columns: ColumnProps<FluidReport>[] = [
    {
      title: 'Name',
      dataIndex: 'equipment',
      key: 'equipment',
      render: item => {
        return <Link to={{ pathname: '/corporate/' + item.id, state: { id: item.id } }}>{item.name}</Link>;
      },
    },
    {
      title: 'Make',
      dataIndex: 'equipment',
      key: 'make',
      render: (equipment: DetailedEquipmentReference, row: FluidReport) => equipment.make,
    },
    {
      title: 'Classification',
      dataIndex: 'equipment',
      key: 'classification',
      render: (equipment: DetailedEquipmentReference, row: FluidReport) => equipment.classification,
    },
    {
      title: 'Fluid',
      dataIndex: 'fluid',
      key: 'fluid',
    },
    {
      title: 'Quantity',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Unit of Measure',
      dataIndex: 'unitOfMeasure',
      key: 'unitOfMeasure',
    },
    {
      title: 'Reported By',
      dataIndex: 'user',
      key: 'user',
      render: item => {
        if (item) {
          return item.firstName + ' ' + item.lastName;
        }
      },
    },
    {
      title: 'Completed',
      dataIndex: 'completedOn',
      key: 'completedOn',
      render: item => {
        if (item) {
          return moment(item).format('ddd MMM D gggg');
        }
      },
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: item => {
        return <Link to={{ pathname: '/corporate/' + item.id, state: { id: item.id } }}>{item.name}</Link>;
      },
    },
  ];

  return (
    <React.Fragment>
      <ContainerHeader title="Fluid Reports" subheading="An Administration view of all Fluid Reports" icon="pe-7s-display1 icon-gradient bg-premium-dark" />
      <SmartTable
        hideActionsColumn={true}
        columns={columns}
        useTableQuery={useFluidReportsQuery}
        queryDocument={FluidReportsDocument}
        name="fluidReports"
        paginationTotalTitle="Fluid Reports"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Fluid Reports']}
      />
    </React.Fragment>
  );
};

export default FluidReportsList;
