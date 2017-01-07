import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import ApolloClient from 'apollo-client';
import { Make, useMakesQuery, MakesDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';

interface ManufactureListProps extends RouteComponentProps<any> {
  client: ApolloClient<any>;
}

export const MakeList = (props: ManufactureListProps) => {
  const onAdd = () => {
    props.history.push('/corporate/makes/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${id}`, { id });
  };

  const columns: ColumnProps<Make>[] = [
    {
      title: 'Brand',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Models',
      dataIndex: 'models',
      key: 'models',
      render: models => {
        if (models) return `${models.length} Models`;
      }
    }
  ];

  return (
    <>
      <ContainerHeader
        title="Makes"
        subheading="An Administration view of all Makes."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Make
          </Button>
        }
      />

      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useMakesQuery}
        queryDocument={MakesDocument}
        name="makes"
        paginationTotalTitle="Makes"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Makes']}
      />
    </>
  );
};

export default MakeList;
