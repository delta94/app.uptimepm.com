import React, { useContext } from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { FluidReport, useFluidReportsQuery, FluidReportsDocument, DetailedEquipmentReference, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import moment from 'moment';

interface FluidsListProps extends RouteComponentProps<any> {}

export const FluidReportsList = (props: FluidsListProps) => {
  const userContext = useContext(CurrentUserContext);
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
  ];

  const excel = () => {
    const serverPath = process.env.REACT_APP_GRAPHQL_SERVER!.replace('/graphql', '/api');
    const downloadUrl = serverPath + '/fluidReportExcel/' + userContext.user.id!.split('/')[1];
    window.open(downloadUrl, '_blank');
  };

  return (
    <React.Fragment>
      <ContainerHeader
        title="Fluid Reports"
        subheading="An Administration view of all Fluid Reports"
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button onClick={excel}>
            <Icon type="file-excel" /> <span>Excel</span>
          </Button>
        }
      />

      <SmartTable
        showCompletedOn={false}
        showCreatedOn={false}
        showUpdated={false}
        showChart={false}
        hideActionsColumn={true}
        columns={columns}
        useTableQuery={useFluidReportsQuery}
        queryDocument={FluidReportsDocument}
        name="fluidReports"
        paginationTotalTitle="Fluid Reports"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Fluid Reports']}
      />
    </React.Fragment>
  );
};

export default FluidReportsList;
