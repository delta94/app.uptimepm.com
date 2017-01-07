import { Button } from 'antd';
import React from 'react';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import { Client, useClientsQuery, ClientsDocument, RoleTypeEnum } from 'generated/index';
import SmartTable from 'components/SmartTable';

export const ClientList = (props: RouteComponentProps) => {
  const onAdd = () => {
    props.history.push('/corporate/clients/add');
  };
  const onEdit = (id: string) => {
    props.history.push(`/corporate/${id}`, { id });
  };

  // Columns of the table
  const columns: ColumnProps<Client>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Login Domain',
      dataIndex: 'loginDomain',
      key: 'loginDomain'
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website'
    }
  ];

  return (
    <>
      <ContainerHeader
        title="Clients"
        subheading="An Administration view of all Clients."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Client
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useClientsQuery}
        queryDocument={ClientsDocument}
        name="clients"
        paginationTotalTitle="Clients"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Clients']}
      />
    </>
  );
};
export default ClientList;
