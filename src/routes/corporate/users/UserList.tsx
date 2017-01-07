import React from 'react';
import { Button, Tag } from 'antd';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import { ColumnProps } from 'antd/lib/table';
import { Role, useUsersQuery, UsersDocument, RoleTypeEnum } from 'generated';
import SmartTable from 'components/SmartTable';

interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export const UserList = (props: RouteComponentProps<any>) => {
  const onAdd = () => {
    props.history.push('/corporate/users/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${id}`, { id });
  };

  const columns: ColumnProps<UserResponse>[] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Client',
      dataIndex: 'client.name',
      key: 'client'
    },
    {
      title: 'Phone(s)',
      dataIndex: 'phones',
      key: 'phones',
      render: phones => {
        if (phones) {
          return phones.map((r: { type: string; digits: string }, index: number) => {
            return (
              <Tag key={index} style={{ pointerEvents: 'none', margin: '-5px 2px' }}>
                {r.type}: {r.digits}
              </Tag>
            );
          });
        }
      }
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: roles => {
        if (roles) {
          return roles.map((r: { id: string; name: string }) => {
            return (
              <Tag key={r.id} style={{ pointerEvents: 'none', margin: '-5px 2px' }}>
                {r.name}
              </Tag>
            );
          });
        }
      }
    }
  ];

  return (
    <>
      <ContainerHeader
        title="Users"
        subheading="An Administration view of all Users."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add User
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useUsersQuery}
        queryDocument={UsersDocument}
        name="users"
        paginationTotalTitle="Users"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Users']}
      />
    </>
  );
};

export default UserList;
