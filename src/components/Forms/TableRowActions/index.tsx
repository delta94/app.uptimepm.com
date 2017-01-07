import * as React from 'react';
import { Dropdown, Button } from 'antd';
import ActionsMenu from './ActionsMenu';
import { RoleTypeEnum } from 'generated';

export interface TableRowActionsProps {
  rowKey: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClone?: (id: string) => void;
  roles?: string[];
  roleType?: RoleTypeEnum;
  permissions?: string[];
}

export default (props: TableRowActionsProps) => {
  return (
    <Dropdown
      overlay={<ActionsMenu rowKey={props.rowKey} onView={props.onView} onEdit={props.onEdit} onDelete={props.onDelete} onClone={props.onClone} roles={props.roles} roleType={props.roleType} permissions={props.permissions} />}
      placement="bottomRight"
    >
      <Button size="small" type="primary">
        Actions
      </Button>
    </Dropdown>
  );
};
