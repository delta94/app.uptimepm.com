import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { RouteComponentProps } from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader';
import PDFButton from 'components/PDFButton';
import Print from './Print';
import {
  useInspectionsForListQuery,
  Inspection,
  InspectionsForListDocument,
  useInspectionsPrintQuery,
  DetailedEquipmentReference,
  RoleTypeEnum,
} from 'generated';
import SmartTable from 'components/SmartTable';
import moment from 'moment';

interface IInspectionListProps extends RouteComponentProps<any> {}

export const InspectionHistoryList = ({ history }: IInspectionListProps) => {
  const [state, setState] = React.useState({ selectedIds: [] as string[] });
  const { loading, data } = useInspectionsPrintQuery({
    // fetchPolicy: 'network-only',
    variables: { selectedInspections: state.selectedIds },
  });

  const onAdd = () => {
    history.push('/client/inspection-history/add');
  };

  const onView = (id: string) => {
    const formattedId = id.split('/')[1];
    history.push('/client/inspection-history/' + formattedId, { id });
  };

  const columns: ColumnProps<Inspection>[] = [
    {
      title: 'Meter Value',
      dataIndex: 'equipment',
      key: 'meterValue',
      render: (equipment: DetailedEquipmentReference, row: Inspection) => {
        if (row.meterValue !== null && row.meterValue !== undefined) return Math.round(row.meterValue * 100) / 100 + ' ' + equipment.meterType;
        else return '';
      },
    },
    {
      title: 'Name',
      dataIndex: 'equipment',
      key: 'name',
      render: (equipment: DetailedEquipmentReference, row: Inspection) => equipment.name,
    },
    {
      title: 'Make',
      dataIndex: 'equipment',
      key: 'make',
      render: (equipment: DetailedEquipmentReference, row: Inspection) => equipment.make,
    },
    {
      title: 'Classification',
      dataIndex: 'equipment',
      key: 'classification',
      render: (equipment: DetailedEquipmentReference, row: Inspection) => equipment.classification,
    },
    // {
    //   title: 'Type',
    //   dataIndex: 'type',
    //   key: 'type',
    // },
    {
      title: 'Pre/Post',
      dataIndex: 'type',
      key: 'type',
    },

    {
      title: 'Who',
      dataIndex: 'who',
      key: 'who',
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

  const onRowSelected = (selectedIds: any, selectedItems: any) => {
    // console.log(`selectedRowKeys: ${selectedIds}`, 'selectedRows: ', selectedItems);
    setState({ ...state, selectedIds: selectedIds });
  };

  return (
    <>
      <ContainerHeader
        title="Inspections"
        subheading="An Administration view of all Inspections for current client."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={[
          <PDFButton
            disabled={state.selectedIds.length === 0 ? true : false}
            key="PDFButton1"
            data={data && data.inspectionsPrint ? data.inspectionsPrint.inspections : []}
            loading={loading}
            document={<Print inspections={data && data.inspectionsPrint ? data.inspectionsPrint.inspections : []} />}
          />,
          <Button key="2" type="primary" onClick={onAdd}>
            Add Inspection
          </Button>,
        ]}
      />
      <SmartTable
        showSelection={true}
        columns={columns}
        onView={onView}
        useTableQuery={useInspectionsForListQuery}
        queryDocument={InspectionsForListDocument}
        name="inspections"
        onRowSelected={onRowSelected}
        paginationTotalTitle="Inspections"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Inspection History']}
      />
    </>
  );
};

export default React.memo(InspectionHistoryList);
