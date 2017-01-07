import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import { RouteComponentProps } from 'react-router-dom';
import ContainerHeader from 'components/ContainerHeader';
import { useInspectionsForListQuery, Inspection, InspectionsForListDocument, DetailedEquipmentReference, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';
import moment from 'moment';
interface IInspectionListProps extends RouteComponentProps<any> {}

export const InspectionList = ({ history }: IInspectionListProps) => {
  const onAdd = () => {
    history.push('/corporate/inspection-history/add');
  };

  const onView = (id: string) => {
    const formattedId = id.split('/')[1];
    history.push('/corporate/inspection-history/' + formattedId, { id });
  };

  const columns: ColumnProps<Inspection>[] = [
    {
      title: 'Client',
      dataIndex: 'client.name',
      key: 'client',
    },
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

  return (
    <>
      <ContainerHeader
        title="Inspections"
        subheading="An Administration view of all Inspections across all clients."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Inspection
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onView={onView}
        useTableQuery={useInspectionsForListQuery}
        queryDocument={InspectionsForListDocument}
        name="inspections"
        paginationTotalTitle="Inspections"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Inspection History']}
      />
    </>
  );
};

export default InspectionList;
