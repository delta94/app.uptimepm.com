import React from 'react';
import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { Equipment, useEquipmentQuery, EquipmentDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';
interface EquipmentListProps extends RouteComponentProps<any> {}

export const EquipmentList = (props: EquipmentListProps) => {
  const onAdd = () => {
    props.history.push('/client/equipment/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/client/${id.toLowerCase()}`, { id });
  };

  const columns: ColumnProps<Equipment>[] = [
    {
      title: 'Meter Value',
      dataIndex: 'meterValue',
      key: 'meterValue',
      render: (meterValue: number, row: Equipment) => {
        if (meterValue !== null && meterValue !== undefined) return Math.round(meterValue * 100) / 100 + ' ' + row.meterType;
        else return '';
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'make'
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification'
    },
    // {
    //   title: 'Attachment',
    //   dataIndex: 'attachment',
    //   key: 'attachment',
    // },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Vin or Serial',
      dataIndex: 'vinOrSerial',
      key: 'vinOrSerial'
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    }
    // {
    //   title: 'Dealer',
    //   dataIndex: 'dealers',
    //   key: 'dealers',
    //   render: (dealers: DealerReference[]) => {
    //     if (dealers) {
    //       return dealers.map(dealer => <Tag>{dealer.name}</Tag>);
    //     } else return null;
    //   },
    // },
  ];

  return (
    <React.Fragment>
      <ContainerHeader
        title="Equipment"
        subheading="An Administration view of all Equipment."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Equipment
          </Button>
        }
      />

      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useEquipmentQuery}
        queryDocument={EquipmentDocument}
        name="equipment"
        paginationTotalTitle="Equipment"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Equipment']}
      />
    </React.Fragment>
  );
};

export default EquipmentList;
