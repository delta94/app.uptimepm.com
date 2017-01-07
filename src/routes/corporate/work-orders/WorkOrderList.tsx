import React, { useContext } from 'react';
import { withApollo } from 'react-apollo';
import { Button, Tabs } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { WorkOrder, useWorkOrdersQuery, WorkOrdersDocument, DetailedEquipmentReference, RoleTypeEnum } from 'generated/index';
import { camelCaseIdToDash } from 'helpers/utils';
import SmartTable from 'components/SmartTable';
import { allowed } from 'components/Routes/Access';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import Widget from 'components/Widget';

interface Props extends RouteComponentProps<any> {}

export const WorkOrderList = (props: Props) => {
  const userContext = useContext(CurrentUserContext);
  const onAdd = () => {
    props.history.push('/corporate/work-orders/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${camelCaseIdToDash(id)}`, { id });
  };

  const columns: ColumnProps<WorkOrder>[] = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Name',
      dataIndex: 'equipment',
      key: 'equipment',
      render: (equipment: DetailedEquipmentReference, row: WorkOrder) => (equipment && equipment.name ? equipment.name : ''),
    },
    {
      title: 'Make',
      dataIndex: 'equipment',
      key: 'make',
      render: (equipment: DetailedEquipmentReference, row: WorkOrder) => (equipment && equipment.make ? equipment.make : ''),
    },
    {
      title: 'Model',
      dataIndex: 'equipment',
      key: 'model',
      render: (equipment: DetailedEquipmentReference, row: WorkOrder) => (equipment && equipment.model ? equipment.model : ''),
    },
    {
      title: 'VIN/Serial',
      dataIndex: 'equipment',
      key: 'vinOrSerial',
      render: (equipment: DetailedEquipmentReference, row: WorkOrder) => {
        if (equipment && equipment.vinOrSerial) {
          return equipment.vinOrSerial;
        }
      },
    },
    {
      title: 'Classification',
      dataIndex: 'equipment',
      key: 'classification',
      render: (equipment: DetailedEquipmentReference, row: WorkOrder) => (equipment && equipment.classification ? equipment.classification : ''),
    },

    {
      title: 'Meter Value',
      dataIndex: 'equipment',
      key: 'meterValue',
      render: (equipment: DetailedEquipmentReference, row: WorkOrder) => {
        if (row.meterValue !== null && row.meterValue !== undefined) return Math.round(row.meterValue * 100) / 100 + ' ' + equipment.meterType;
        else return '';
      },
    },
    {
      title: 'Reported By',
      dataIndex: 'reportedBy.firstName',
      key: 'reportedBy.firstName',
    },
  ];

  const containerActionButtons = () => {
    const buttons: any = [];
    // if (allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Client, ['Work Orders'], 'Export')) {
    //   buttons.push(
    //     <PDFButton
    //       disabled={state.selectedIds.length === 0 ? true : false}
    //       key="PDFButtonWorkOrders"
    //       data={data && data.workOrdersPrint ? data.workOrdersPrint.workOrders : []}
    //       loading={loading}
    //       document={<Print workOrders={data && data.workOrdersPrint ? data.workOrdersPrint.workOrders : []} />}
    //     />
    //   );
    // }
    if (allowed(userContext.user, ['Administrator'], RoleTypeEnum.Corporate, ['Work Orders'], 'Add')) {
      buttons.push(
        <Button key="add-work-order" type="primary" onClick={onAdd}>
          Add Work Order
        </Button>
      );
    }
    return buttons;
  };
  return (
    <React.Fragment>
      <ContainerHeader
        title="Work Orders"
        subheading="An Administration view of all Work orders."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={containerActionButtons()}
      />
      <Tabs>
        <Tabs.TabPane key="workOrderTableMain" tab={<div style={{ color: 'green' }}>Main</div>} forceRender={false}>
          <Widget style={{ borderTopLeftRadius: 0 }}>
            <SmartTable
              key="tableWorkOrdersMain"
              completed={false}
              showCompletedOn={false}
              columns={columns}
              onEdit={onEdit}
              useTableQuery={useWorkOrdersQuery}
              queryDocument={WorkOrdersDocument}
              name="workOrders"
              paginationTotalTitle="Work Orders"
              roles={['Administrator']}
              roleType={RoleTypeEnum.Corporate}
              permissions={['Work Orders']}
            />
          </Widget>
        </Tabs.TabPane>

        <Tabs.TabPane key="workOrderTableCompleted" tab={<div style={{ color: 'green' }}>Completed</div>} forceRender={false}>
          <Widget style={{ borderTopLeftRadius: 0 }}>
            <SmartTable
              key="tableWorkOrdersCompleted"
              completed={true}
              showCompletedOn={false}
              columns={columns}
              onEdit={onEdit}
              useTableQuery={useWorkOrdersQuery}
              queryDocument={WorkOrdersDocument}
              name="workOrders"
              paginationTotalTitle="Work Orders"
              roles={['Administrator']}
              roleType={RoleTypeEnum.Corporate}
              permissions={['Work Orders']}
            />
          </Widget>
        </Tabs.TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default withApollo<RouteComponentProps<any>>(WorkOrderList);
