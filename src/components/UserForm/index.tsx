import React, { FormEvent } from 'react';
import { Form, Row, Col, Input, Button, Checkbox, Alert } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import GetUser from './GetUser';
import Widget from 'components/Widget';
import ContainerHeader from 'components/ContainerHeader';
import RoleManagement from './RoleManagement';
import {
  User,
  UserRoleReferenceInput,
  useSaveUserMutation,
  UserInput,
  IdNameReference,
  useAvailableRolesQuery,
  useClientForSelectionQuery,
  Role,
  SaveUserMutation,
} from 'generated';
import { removeTypename } from 'helpers/utils';
import { GraphQLError, ExecutionResult } from 'graphql';
import { clone } from 'lodash';
import Addresses from 'components/Addresses';
import Phones from 'components/Phones';
import { DateTime } from 'luxon';

export interface SaveUserProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  user: User;
  roles: UserRoleReferenceInput[];
}

interface SaveUserResponse {
  saveUser: {
    id: string;
    firstName: string;
  };
}

export const SaveUser = (props: SaveUserProps) => {
  // console.log('Rending user form');
  const {
    form: { getFieldDecorator },
    location,
    user,
  } = props;
  const id = location.state ? location.state.id : undefined;
  const isEditMode = id ? true : false;
  const [saveUser] = useSaveUserMutation();
  const { data: availableRoles } = useAvailableRolesQuery({
    variables: { skip: 0, pageSize: 100, searchText: '', userId: props.location.state && props.location.state.id ? props.location.state.id : null },
  });
  const rolesSource = availableRoles && availableRoles.availableRoles ? availableRoles.availableRoles.roles : ([] as Role[]);

  const { data: resClients } = useClientForSelectionQuery({ variables: { skip: 0, pageSize: 100, searchText: '' } });

  const err: readonly GraphQLError[] = [];
  const [state, setState] = React.useState({
    mutationErrors: err,
  });

  const cancel = () => {
    props.history.goBack();
    // props.history.push('/client/users');
  };

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, user: UserInput) => {
      if (err) {
        // console.log(err);
        return false;
      }

      if (user.clientId) {
        user.client = removeTypename(resClients!.clients.clients.find(c => c.id === user.clientId));
      }

      if (user.rolesIds) {
        user.roles = [];
        user.rolesIds.forEach(selectedRoleId => {
          const foundRole = rolesSource.find(x => x.id === selectedRoleId);
          user.roles!.push(removeTypename(clone(foundRole)));
        });
      }

      let result: ExecutionResult<SaveUserMutation> | void;
      result = await saveUser({ variables: { data: user } });

      if (result && result.errors) {
        setState({ ...state, mutationErrors: result.errors ? result.errors : [] });
      }

      if (result && result.data) {
        form.resetFields();
        props.history.goBack();
      }
    });
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      <Col>
        <Button type="primary" htmlType="submit">
          Save User
        </Button>
      </Col>
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );
  // if (state.mutationErrors.length > 0) return <div className="error">Error while fetching user details </div>;
  return (
    <>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <ContainerHeader title={`${isEditMode ? 'Edit' : 'Add New'} User`} icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
        <pre>
          {state.mutationErrors.map(({ message }, i) => (
            <Alert message={message} type="error" />
          ))}
        </pre>
        <Widget>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={12}>
              {getFieldDecorator('id', {
                initialValue: user.id,
              })(<Input placeholder="id" type="hidden" />)}
              <Form.Item label="First Name">
                {getFieldDecorator('firstName', {
                  initialValue: user.firstName,
                  trigger: 'onBlur',
                  valuePropName: 'defaultValue',
                  rules: [
                    {
                      required: true,
                      message: 'Please input first name!',
                    },
                  ],
                })(<Input placeholder="First Name" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Last Name">
                {getFieldDecorator('lastName', {
                  initialValue: user.lastName,
                  trigger: 'onBlur',
                  valuePropName: 'defaultValue',
                  rules: [
                    {
                      required: true,
                      message: 'Please input last name!',
                    },
                  ],
                })(<Input placeholder="Last Name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={12}>
              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  initialValue: user.email,
                  trigger: 'onBlur',
                  valuePropName: 'defaultValue',
                  rules: [
                    {
                      required: false,
                      message: 'Please input email!',
                    },
                    {
                      type: 'email',
                      message: 'Please enter valid E-mail!',
                    },
                  ],
                })(<Input placeholder="Email" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Password">
                {getFieldDecorator('password', {
                  initialValue: user.password,
                  trigger: 'onBlur',
                  valuePropName: 'defaultValue',
                  rules: [
                    {
                      required: true,
                      message: 'Please input password!',
                    },
                  ],
                })(<Input.Password placeholder="Password" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10} type="flex" align="middle">
            <Col xs={24} sm={24}>
              <Form.Item>
                {getFieldDecorator('active', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Active</Checkbox>)}
              </Form.Item>
            </Col>
          </Row>
          {user.createdOn && user.updatedOn && (
            <Row type="flex" gutter={20}>
              <Col>Created: {DateTime.fromISO(user.createdOn.toString(), { zone: 'local' }).toLocaleString(DateTime.DATETIME_SHORT)}</Col>
              <Col>Last Updated: {DateTime.fromISO(user.updatedOn.toString(), { zone: 'local' }).toLocaleString(DateTime.DATETIME_SHORT)}</Col>
            </Row>
          )}
        </Widget>
        <Widget>
          <Row>
            <Col>
              <h3>Address Information</h3>
            </Col>
          </Row>
          <Addresses isRequired={false} addresses={user.addresses ? user.addresses : []} form={props.form} />
        </Widget>
        <Widget>
          <Row>
            <Col>
              <h3>Phones</h3>
            </Col>
          </Row>
          <Phones isRequired={false} phones={user.phones ? user.phones : []} form={props.form} />
        </Widget>
        <RoleManagement
          form={props.form}
          roles={rolesSource}
          clients={resClients && resClients.clients ? (resClients.clients.clients as IdNameReference[]) : []}
          userRoles={user.roles}
          isEdit={isEditMode}
          client={isEditMode && user && user.client ? user.client : ({} as IdNameReference)}
        />
        <Form.Item>{actionButtons}</Form.Item>
      </Form>
    </>
  );
};

export default Form.create()(GetUser(SaveUser));
