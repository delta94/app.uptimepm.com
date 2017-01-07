import React, { useContext } from 'react';
import { withApollo } from 'react-apollo';
import { Button, Tabs, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import {
  WorkOrder,
  useWorkOrdersQuery,
  WorkOrdersDocument,
  useWorkOrdersPrintQuery,
  DetailedEquipmentReference,
  RoleTypeEnum,
  useEquipmentSelectionQuery,
  InspectionNotificationReference,
  ServiceIntervalNotificationReference,
} from 'generated';
import { camelCaseIdToDash } from 'helpers/utils';
import SmartTable from 'components/SmartTable';
import PDFButton from 'components/PDFButton';
import Print from './Print';
import { allowed } from 'components/Routes/Access';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import Widget from 'components/Widget';
import './index.scss';
import moment from 'moment';
const Option = Select.Option;

interface Props extends RouteComponentProps<any> {}

export const WorkOrderList = (props: Props) => {
  const currentUserContext = useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUserContext.notificationCount !== 0) currentUserContext.setNotificationCount(0);
    // eslint-disable-next-line
  }, []);

  const { loading: loadingEquipment, data: dataEquipment } = useEquipmentSelectionQuery({ variables: { skip: 0, pageSize: 100, searchText: '' } });
  const [state, setState] = React.useState({
    equipmentId: '',
    equipmentIdCompleted: '',
    name: '',
    selectedIds: [] as string[],
  });

  const { loading, data } = useWorkOrdersPrintQuery({
    fetchPolicy: 'network-only',
    variables: { selectedInspections: state.selectedIds },
  });

  const onAdd = () => {
    props.history.push('/client/work-orders/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/client/${camelCaseIdToDash(id)}`, { id });
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
      title: 'Inspection',
      dataIndex: 'inspection',
      key: 'inspection',
      render: (inspection: InspectionNotificationReference, row: WorkOrder) => (inspection && inspection.title ? inspection.title : ''),
    },
    {
      title: 'Service',
      dataIndex: 'serviceInterval',
      key: 'serviceInterval',
      render: (serviceInterval: ServiceIntervalNotificationReference, row: WorkOrder) =>
        serviceInterval && serviceInterval.title ? serviceInterval.title : null,
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
    // {
    //   title: 'Reported By',
    //   dataIndex: 'reportedBy.firstName',
    //   key: 'reportedBy.firstName',
    // },
    {
      title: 'Issue Date',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: item => {
        if (item) {
          return moment(item).format('MMM D gggg');
        }
      },
    },
    {
      title: 'Assigned Date',
      dataIndex: 'assignedOn',
      key: 'assignedOn',
      render: item => {
        if (item) {
          return moment(item).format('MMM D gggg');
        }
      },
    },
  ];

  const onRowSelected = (selectedIds: any, selectedItems: any) => {
    // console.log(`selectedRowKeys: ${selectedIds}`, 'selectedRows: ', selectedItems);
    setState({ ...state, selectedIds: selectedIds });
  };

  const containerActionButtons = () => {
    const buttons: any = [];
    console.log('Bla');
    if (allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Client, ['Work Orders'], 'Export')) {
      buttons.push(
        <PDFButton
          disabled={state.selectedIds.length === 0 ? true : false}
          key="PDFButtonWorkOrders"
          data={data && data.workOrdersPrint ? data.workOrdersPrint.workOrders : []}
          loading={loading}
          document={<Print workOrders={data && data.workOrdersPrint ? data.workOrdersPrint.workOrders : []} />}
        />
      );
    }
    if (allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Client, ['Work Orders'], 'Add')) {
      buttons.push(
        <Button key="add-work-order" type="primary" onClick={onAdd}>
          Add Work Order
        </Button>
      );
    }
    return buttons;
  };

  const onChange = (s: string) => {
    let name = '';
    const foundItem = dataEquipment!.equipment.equipment.find(x => x.id === s);
    if (foundItem) name = foundItem.name;
    setState({ ...state, equipmentId: s, name: name });
  };

  const onChangeCompleted = (s: string) => {
    let name = '';
    const foundItem = dataEquipment!.equipment.equipment.find(x => x.id === s);
    if (foundItem) name = foundItem.name;
    setState({ ...state, equipmentIdCompleted: s, name: name });
  };

  return (
    <div className="work-order-list">
      <ContainerHeader
        title="Work Orders"
        subheading="An Administration view of all Work orders for specific Client"
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={containerActionButtons()}
      />
      <Tabs>
        <Tabs.TabPane key="workOrderTableMain" tab={<div style={{ color: 'green' }}>Main</div>} forceRender={false}>
          <Widget style={{ borderTopLeftRadius: 0 }}>
            {!loadingEquipment && dataEquipment && (
              <div className="equipment-select">
                <Select
                  allowClear={true}
                  value={state.equipmentId === '' ? undefined : state.equipmentId}
                  style={{ minWidth: '250px' }}
                  placeholder="Please select Equipment"
                  onChange={onChange}
                >
                  {dataEquipment.equipment.equipment.map((item: any) => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </div>
            )}
            <SmartTable
              key="tableWorkOrdersMain"
              completed={false}
              equipmentId={state.equipmentId}
              showCompletedOn={false}
              showSelection={true}
              onRowSelected={onRowSelected}
              columns={columns}
              onEdit={onEdit}
              useTableQuery={useWorkOrdersQuery}
              queryDocument={WorkOrdersDocument}
              name="workOrders"
              paginationTotalTitle="Work Orders"
              roles={['Administrator']}
              roleType={RoleTypeEnum.Client}
              permissions={['Work Orders']}
            />
          </Widget>
        </Tabs.TabPane>

        <Tabs.TabPane key="workOrderTableCompleted" tab={<div style={{ color: 'green' }}>Completed</div>} forceRender={false}>
          <Widget style={{ borderTopLeftRadius: 0 }}>
            {!loadingEquipment && dataEquipment && (
              <div className="equipment-select">
                <Select
                  allowClear={true}
                  value={state.equipmentIdCompleted === '' ? undefined : state.equipmentIdCompleted}
                  style={{ minWidth: '250px' }}
                  placeholder="Please select Equipment"
                  onChange={onChangeCompleted}
                >
                  {dataEquipment.equipment.equipment.map((item: any) => (
                    <Option key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </div>
            )}
            <SmartTable
              key="tableWorkOrdersCompleted"
              equipmentId={state.equipmentIdCompleted}
              completed={true}
              showCompletedOn={false}
              showSelection={true}
              onRowSelected={onRowSelected}
              columns={columns}
              onEdit={onEdit}
              useTableQuery={useWorkOrdersQuery}
              queryDocument={WorkOrdersDocument}
              name="workOrders"
              paginationTotalTitle="Work Orders"
              roles={['Administrator']}
              roleType={RoleTypeEnum.Client}
              permissions={['Work Orders']}
            />
          </Widget>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default withApollo<RouteComponentProps<any>>(WorkOrderList);
