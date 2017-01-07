import * as React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { Tabs, Row, Col, Checkbox } from 'antd';
import Widget from 'components/Widget';
import styles from './index.module.scss';
import { filter, find, clone, findIndex } from 'lodash';
import cn from 'classnames';
import { RoleTypeEnum, Permission, Role } from 'generated/index';
import { removeTypename } from 'helpers/utils';

export interface RoleManagementProps {
  form: WrappedFormUtils;
  role: Role;
  permissions: Permission[];
}

export default (props: RoleManagementProps) => {
  const [permissions] = React.useState(
    props.role ? filter(props.permissions, permission => permission.type === props.role.type) : filter(props.permissions, permission => permission.type === RoleTypeEnum.Client)
  );
  const [userRolePermissions] = React.useState(props.role ? clone(props.role.permissions) : []);

  const {
    form: { getFieldDecorator },
    role
  } = props;
  // console.log('props', props, userRolePermissions);
  return (
    <Tabs defaultActiveKey={role.id!}>
      <Tabs.TabPane tab={role.name} key={role.id!}>
        <Row gutter={16} type="flex">
          {permissions.map((permission: Permission, permissionIndex: number) => {
            // console.log('role.permissions', role.permissions, permission.id);
            const rolePermission = find(userRolePermissions, rolePermission => rolePermission.id === permission.id);
            // console.log('rolePermission', rolePermission, permission);
            const classes = cn(styles.flexWidget, styles.roleWidget, rolePermission ? (rolePermission.privileges.length <= 0 ? styles.inactive : '') : styles.inactive);
            return (
              <Col xs={24} sm={6} style={{ display: 'flex', justifyItems: 'stretch', alignItems: 'stretch' }} key={`${role.id}|${permissionIndex}`}>
                <Widget styleName={classes}>
                  <h3>{permission.name}</h3>
                  {getFieldDecorator(`permissions[${permissionIndex}].id`, {
                    initialValue: permission.id
                  })(<input type="hidden" />)}
                  {getFieldDecorator(`permissions[${permissionIndex}].name`, {
                    initialValue: permission.name
                  })(<input type="hidden" />)}
                  {getFieldDecorator(`permissions[${permissionIndex}].type`, {
                    initialValue: permission.type
                  })(<input type="hidden" />)}
                  {getFieldDecorator(`permissions[${permissionIndex}].privileges`, {
                    initialValue: rolePermission ? rolePermission.privileges : []
                  })(
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      onChange={item => {
                        const index = findIndex(userRolePermissions, sp => sp.id === permission.id);
                        if (index >= 0) {
                          userRolePermissions[index].privileges = item as string[];
                        } else {
                          userRolePermissions.push(removeTypename(permission));
                          userRolePermissions[userRolePermissions.length - 1].privileges = item as string[];
                        }
                      }}
                    >
                      <Row>
                        {permission.privileges.map((privilege: string, privilegeIndex: number) => (
                          <Col key={`${permissionIndex}|${privilegeIndex}`}>
                            <Checkbox value={privilege}>{privilege}</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  )}
                </Widget>
              </Col>
            );
          })}
        </Row>
      </Tabs.TabPane>
      {/* <Tabs.TabPane
        tab={
          <Select size="small" style={{ width: 300 }}>
            {stateRolePermissions.map(p => {
              return (
                <Select.Option key={p.id} value={p.id}>
                  {p.name}
                </Select.Option>
              );
            })}
          </Select>
        }
        key="permissions"
      />*/}
    </Tabs>
  );
};
