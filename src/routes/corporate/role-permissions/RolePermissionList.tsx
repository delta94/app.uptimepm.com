import React from 'react';
import { Tag, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import ContainerHeader from 'components/ContainerHeader';
import { RouteComponentProps } from 'react-router';
import styles from 'routes/routes.module.scss';
import { RoleTypeEnum, RolePermission, useRolePermissionsQuery, RolePermissionsDocument } from 'generated/index';
import SmartTable from 'components/SmartTable';
import { camelCaseIdToDash } from 'helpers/utils';

interface IRolePermissionListProps extends RouteComponentProps<any> {
  onEdit(roleId: string): void;
}

export const RolePermissionList = (props: IRolePermissionListProps) => {
  const onAdd = () => {
    props.history.push('/corporate/role-permissions/add');
  };

  const onEdit = (id: string) => {
    props.history.push(`/corporate/${camelCaseIdToDash(id)}`, { id });
  };

  const columns: ColumnProps<RolePermission>[] = [
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
      title: 'Privileges',
      dataIndex: 'privileges',
      key: 'privileges',
      className: styles.tagsColumn,
      render: privileges => {
        return privileges.map((privilege: string) => {
          return (
            <Tag key={privilege} style={{ pointerEvents: 'none' }}>
              {privilege}
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
            Add Role Permission
          </Button>
        }
      />
      <SmartTable
        columns={columns}
        onEdit={onEdit}
        useTableQuery={useRolePermissionsQuery}
        queryDocument={RolePermissionsDocument}
        name="rolePermissions"
        paginationTotalTitle="Role Permissions"
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Role Permissions']}
      />
    </>
  );
};

export default RolePermissionList;
