import * as React from 'react';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { Tabs, Row, Col, Checkbox } from 'antd';
import Widget from 'components/Widget';
import { IdNameReference, Role, Permission, UserRoleReference } from 'generated';
import MultipleDropdown from 'components/MultipleDropdown';
import FormItem from 'antd/lib/form/FormItem';
import SingleDropdown from 'components/SingleDropdown';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { clone, find } from 'lodash';

export interface RoleManagementProps {
  form: WrappedFormUtils;
  roles: Role[];
  userRoles: UserRoleReference[] | undefined;
  isEdit: boolean;
  client?: IdNameReference;
  clients?: IdNameReference[];
}

export default (props: RoleManagementProps) => {
  const userContext = React.useContext(CurrentUserContext);
  const [state, setState] = React.useState({
    isRoleClient: false,
    selectedRoleIds: [''],
  });

  const { userRoles } = props;
  const calcRolesOnChange = (selectedRoleIds: string[]) => {
    for (const selectedRoleId of selectedRoleIds) {
      const role = props.roles.find(x => x.id === selectedRoleId);
      if (role && role.type === 'Client') {
        return true;
      }
    }
    return false;
  };

  const setOnPerm = (checkedValues: any, perm: Permission): Permission => {
    perm.privileges = checkedValues;
    return perm;
  };

  const updateRoleClone = (roleClone: Role, checkedValues: any, permIndex: number): Role => {
    const permClone = clone(roleClone.permissions[permIndex]);
    const perm = setOnPerm(checkedValues, permClone);
    roleClone.permissions[permIndex] = perm;
    return roleClone;
  };

  const onChange = (checkedValues: any, roleId: string, permissionId: string) => {
    const roleIndex = props.roles.findIndex(x => x.id === roleId);
    const permissionIndex = props.roles.find(x => x.id === roleId)!.permissions.findIndex(x => x.id === permissionId);

    const roleClone = clone(props.roles[roleIndex]);
    props.roles[roleIndex] = updateRoleClone(roleClone, checkedValues, permissionIndex);
    // console.log('All rolesSource=', props.roles);
    // console.log('All props.roles[0].permissions[0].privileges=', props.roles[roleIndex].permissions[permissionIndex].privileges);
  };

  // const onChangeIndex = (checkedValues: any, roleIndex: number, permissionIndex: number) => {
  //   console.log(roleIndex);
  //   const roleClone = clone(props.roles[roleIndex]);
  //   props.roles[roleIndex] = updateRoleClone(roleClone, checkedValues, permissionIndex);
  //   console.log('All rolesSource=', props.roles);
  //   console.log('All props.roles[0].permissions[0].privileges=', props.roles[0].permissions[0].privileges);
  //   console.log('All props.roles[1].permissions[0].privileges=', props.roles[1].permissions[0].privileges);
  // };

  const selRolesOnChange = (selectedRoleIds: string[]) => {
    const tempRole = calcRolesOnChange(selectedRoleIds);
    state.selectedRoleIds = selectedRoleIds;
    setState({ ...state, isRoleClient: tempRole, selectedRoleIds }); // display client selection
  };

  // const initPerm = (userRoles: UserRoleReferenceInput[]) => {
  //   // for each selected role init perms
  //   userRoles.forEach(usrRole => {
  //     const role = props.roles.find(x => x.id === usrRole.id);
  //     if (role) {
  //       role.permissions = usrRole.permissions as Permission[];
  //     }
  //   });
  // };

  React.useEffect(() => {
    if (props.isEdit && userRoles) {
      // initPerm(userRoles);
      selRolesOnChange(userRoles.map(x => x.id));
    }
    // eslint-disable-next-line
  }, [props.isEdit, userRoles, props.roles]);

  // const options = [
  //   { label: 'View', value: 'View' },
  //   { label: 'Add', value: 'Add' },
  //   { label: 'Edit', value: 'Edit' },
  //   { label: 'Delete', value: 'Delete' },
  //   { label: 'Clone', value: 'Clone' },
  //   { label: 'Export', value: 'Export' },
  // ];

  return (
    <>
      <FormItem label="Selected Roles:">
        <MultipleDropdown
          onChange={selRolesOnChange}
          fieldName="rolesIds"
          form={props.form}
          placeholder="Please select roles"
          defValue={userRoles ? userRoles : []}
          names={['name', 'type']}
          data={props.roles}
        />
      </FormItem>

      {state.isRoleClient && userContext.corporateUser() ? (
        <SingleDropdown
          label="Please select client:"
          fieldName="clientId"
          form={props.form}
          placeholder="Clients"
          names={['name']}
          defValue={props.isEdit ? props.client : null}
          data={props.clients!}
        />
      ) : null}

      <Tabs>
        {props.roles
          .filter(x => state.selectedRoleIds.includes(x.id!))
          .map((role, roleIndex) => {
            return (
              <Tabs.TabPane forceRender={false} tab={role.name + ' (' + role.type + ')'} key={roleIndex.toString()}>
                <Row gutter={16} type="flex">
                  {role.permissions.map((permission, permissionIndex) => {
                    const userRole = find(userRoles, ur => ur.id === role.id);
                    const availablePermissions = permission.privileges.map(p => ({ label: p, value: p }));
                    let privileges = permission.privileges;
                    if (userRole) {
                      const userPermission = find(userRole.permissions, p => p.id === permission.id);
                      privileges = userPermission ? userPermission.privileges : [];
                    }
                    return (
                      <Col xs={24} sm={6} key={role.id + '_' + permissionIndex}>
                        <Widget>
                          <h3>{permission.name}</h3>
                          <Form.Item>
                            <Checkbox.Group
                              key={'checkbox' + role.id + '_' + permissionIndex}
                              options={availablePermissions}
                              defaultValue={privileges}
                              onChange={e => onChange(e, role.id!, permission.id!)}
                              style={{ width: '100%' }}
                            />
                          </Form.Item>
                        </Widget>
                      </Col>
                    );
                  })}
                </Row>
              </Tabs.TabPane>
            );
          })}
      </Tabs>
    </>
  );
};
