import React, { FormEvent } from 'react';
import { ExecutionResult } from 'react-apollo';
import { Form, Row, Col, Input, Button, Checkbox, Alert, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import GetUser from './GetUser';
import Widget from 'components/Widget';
import ContainerHeader from 'components/ContainerHeader';
import Phones from 'components/Phones';
import { User, UserRoleReferenceInput, UserInput, useSaveMyAccountMutation, Address, Phone, SaveMyAccountMutation } from 'generated';
import { GraphQLError } from 'graphql';
import Addresses from 'components/Addresses';

export interface SaveUserProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  user: User;
  roles: UserRoleReferenceInput[];
}

export const SaveUser = (props: SaveUserProps) => {
  document.title = 'UPM :: My Account';
  const {
    form: { getFieldDecorator },
    user,
  } = props;
  const [saveMyAccount] = useSaveMyAccountMutation();

  const err: GraphQLError[] = [];
  const [state, setState] = React.useState({
    mutationErrors: err,
  });

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, user: UserInput) => {
      if (err) {
        // console.log(err);
        return false;
      }

      let result: ExecutionResult<SaveMyAccountMutation> | void;
      result = await saveMyAccount({ variables: { data: user } });

      if (result && result.errors) {
        setState({ ...state, mutationErrors: result.errors ? result.errors : [] });
      }

      if (result && result.data) {
        form.resetFields();
        message.success('User saved successfully.');
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
    </Row>
  );
  return (
    <>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <ContainerHeader title="My Account" icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
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
                      required: true,
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
        </Widget>
        <Widget>
          <Row>
            <Col>
              <h3>Address Information</h3>
            </Col>
          </Row>
          <Addresses addresses={user.addresses ? user.addresses : [{} as Address]} form={props.form} />
        </Widget>
        <Widget>
          <Row>
            <Col>
              <h3>Phones</h3>
            </Col>
          </Row>
          <Phones phones={user.phones ? user.phones : [{} as Phone]} form={props.form} />
        </Widget>
        <Form.Item>{actionButtons}</Form.Item>
      </Form>
    </>
  );
};

export default Form.create()(GetUser(SaveUser));
