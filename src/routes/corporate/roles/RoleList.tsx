import React from 'react';
import { Tag, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import styles from 'routes/routes.module.scss';
import { Permission, Role, RoleTypeEnum, useRolesQuery, RolesDocument } from 'generated/index';
import SmartTable from 'components/SmartTable';

interface IRoleListProps extends RouteComponentProps<any> {
  onEdit(roleId: string): void;
}

export const RoleList = (props: IRoleListProps) => {
  const onAdd = () => {
    props.history.push('/corporate/roles/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${id}`, { id });
  };

  const columns: ColumnProps<Role>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Scope',
      dataIndex: 'scope',
      key: 'scope'
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      className: styles.tagsColumn,
      render: (permissions, row: Role) => {
        return permissions.map((permission: Permission) => {
          return (
            <Tag key={`${permission.id!}|${row.id!}`} style={{ pointerEvents: 'none' }}>
              {permission.name}
            </Tag>
          );
        });
      }
    }
  ];

  return (
    <>
      <ContainerHeader
        title="Roles"
        subheading="An Administration view of all Roles."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Button type="primary" onClick={onAdd}>
            Add Role
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useRolesQuery}
        queryDocument={RolesDocument}
        name="roles"
        paginationTotalTitle="Roles"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Roles']}
      />
    </>
  );
};

export default RoleList;
