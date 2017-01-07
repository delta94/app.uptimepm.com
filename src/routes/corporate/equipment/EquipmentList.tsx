import React from 'react';
import { Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { Equipment, useEquipmentQuery, EquipmentDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';
interface EquipmentListProps extends RouteComponentProps<any> {}

export const EquipmentList = (props: EquipmentListProps) => {
  // const { fetchMore, loading, data } = useEquipmentQuery({
  //   variables: { skip: 0, pageSize: 5, searchText: '' },
  // });

  const onAdd = () => {
    props.history.push('/corporate/equipment/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${id}`, { id });
  };

  const columns: ColumnProps<Equipment>[] = [
    {
      title: 'Client',
      dataIndex: 'client.name',
      key: 'client'
    },
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

  // const onChange = (page: number, pageSize?: number) => {
  //   const pageSizeNew = pageSize ? pageSize : 15;
  //   const skipCalculated = (page - 1) * pageSizeNew;
  //   setState({ ...state, loading: true, page });
  //   fetchMore({
  //     variables: { pageSize: state.pageSize, skip: skipCalculated, searchText: '' },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       setState({ ...state, loading: false, skip: skipCalculated, page });
  //       return { ...prev, equipment: { ...fetchMoreResult.equipment } };
  //     },
  //     query: EquipmentDocument,
  //   });
  // };

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
        roleType={RoleTypeEnum.Corporate}
        permissions={['Equipment']}
      />
    </React.Fragment>
  );
};

export default EquipmentList;
