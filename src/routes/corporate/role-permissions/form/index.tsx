import React, { FormEvent, FunctionComponent } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import ReactSelect from 'react-select';
import CreatableSelect from 'react-select/creatable';

import GraphQLError from 'components/GraphQLError';

import GetRolePermission from './GetRolePermission';
import Widget from 'components/Widget';
import ContainerHeader from 'components/ContainerHeader';
import ActionButtons from 'components/Forms/ActionButtons';
import { RolePermission, useSaveRolePermissionMutation } from 'generated/index';
import { customStyles } from 'components/common/styles';
import { roleTypes } from 'helpers/selectData';

const FormItem = Form.Item;

export interface SaveRolePermissionProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  rolePermission: RolePermission;
}

const SaveRolePermission: FunctionComponent<SaveRolePermissionProps> = ({ form, rolePermission, history }) => {
  const [saveRolePermission, { error }] = useSaveRolePermissionMutation();

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        // console.log(err);
        return false;
      }

      // console.log('values', values);
      const { privileges } = values;
      values.privileges = (privileges as { value: string; label: string }[]).map(p => p.label);
      values.type = values.type.value;
      const result = await saveRolePermission({ variables: { data: values } });
      if (result && result.data) {
        form.resetFields();
        history.push('/corporate/role-permissions');
      }
    });
  };

  const cancel = () => {
    history.push('/corporate/roles');
  };

  const { getFieldDecorator } = form;
  // const id = location.state ? location.state.id : undefined;

  return (
    <Form layout="vertical" onSubmit={handleSubmit} className="role-form">
      <ContainerHeader
        title="Roles"
        subheading="An Administration view of all Roles."
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={<ActionButtons onCancel={cancel} submitText="Save Role Permission" />}
      />
      <Widget>
        <GraphQLError error={error} />
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={12}>
            {getFieldDecorator('id', {
              initialValue: rolePermission.id
            })(<Input placeholder="id" type="hidden" />)}
            <FormItem label="Name">
              {getFieldDecorator('name', {
                initialValue: rolePermission.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input Name'
                  }
                ]
              })(<Input placeholder="name" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label="Type">
              {getFieldDecorator('type', {
                initialValue: rolePermission.type ? { value: rolePermission.type, label: rolePermission.type } : null,
                rules: [
                  {
                    required: true,
                    message: 'Please select Role Type'
                  }
                ]
              })(<ReactSelect options={roleTypes} styles={customStyles} placeholder="Please select Role Type" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="Privileges">
              {getFieldDecorator('privileges', {
                initialValue: rolePermission.privileges
                  ? rolePermission.privileges.reduce((p, c) => p.concat([{ value: c, label: c }]), new Array<{ value: string; label: string }[]>())
                  : [],
                rules: [
                  {
                    required: true,
                    message: 'Please select at least one Privilege'
                  }
                ]
              })(
                <CreatableSelect
                  isClearable
                  isMulti
                  styles={customStyles}
                  options={[
                    { value: 'View', label: 'View' },
                    { value: 'Add', label: 'Add' },
                    { value: 'Edit', label: 'Edit' },
                    { value: 'Delete', label: 'Delete' },
                    { value: 'Clone', label: 'Clone' },
                    { value: 'Export', label: 'Export' }
                  ]}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </Widget>

      <Row>
        <Col xs={24} sm={24}>
          <FormItem>
            <ActionButtons onCancel={cancel} submitText="Save Role Permission" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(GetRolePermission(SaveRolePermission));
