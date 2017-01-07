import * as React from 'react';
import { Menu, Icon } from 'antd';
import styles from './index.module.scss';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { RoleTypeEnum } from 'generated';
import { allowed } from 'components/Routes/Access';

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
  const userContext = React.useContext(CurrentUserContext);
  // console.log('props.roles, props.roleType, props.permissions', props.roles, props.roleType, props.permissions);
  return (
    <Menu className={styles.tableRowActionsMenu}>
      {props.onEdit && allowed(userContext.user, props.roles, props.roleType, props.permissions, 'Edit') && (
        <Menu.Item key="Edit" className={styles.tableRowActionsMenuItem}>
          <div onClick={() => (props.onEdit ? props.onEdit(props.rowKey) : null)}>
            <Icon type="edit" className={styles.tableRowActionsMenuItemIcon} />
            Edit
          </div>
        </Menu.Item>
      )}
      {props.onView && allowed(userContext.user, props.roles, props.roleType, props.permissions, 'View') && (
        <Menu.Item key="View" className={styles.tableRowActionsMenuItem}>
          <div onClick={() => (props.onView ? props.onView(props.rowKey) : null)}>
            <Icon type="file-search" className={styles.tableRowActionsMenuItemIcon} />
            View
          </div>
        </Menu.Item>
      )}
      {props.onClone && allowed(userContext.user, props.roles, props.roleType, props.permissions, 'Clone') && (
        <Menu.Item key="Clone" className={styles.tableRowActionsMenuItem}>
          <div onClick={() => (props.onClone ? props.onClone(props.rowKey) : null)}>
            <Icon type="copy" className={styles.tableRowActionsMenuItemIcon} />
            Clone
          </div>
        </Menu.Item>
      )}
      {props.onDelete && allowed(userContext.user, props.roles, props.roleType, props.permissions, 'Delete') && (
        <Menu.Item key="Delete" className={styles.tableRowActionsMenuItem}>
          <div onClick={() => (props.onDelete ? props.onDelete(props.rowKey) : null)}>
            <Icon type="delete" className={styles.tableRowActionsMenuItemIcon} />
            Delete
          </div>
        </Menu.Item>
      )}
    </Menu>
  );
};
