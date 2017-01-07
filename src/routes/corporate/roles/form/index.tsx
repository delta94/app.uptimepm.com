import React, { Component, FormEvent } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { RouteComponentProps } from 'react-router';
import { Mutation, MutationFunction } from 'react-apollo';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import ReactSelect from 'react-select';

import GraphQLError from 'components/GraphQLError';
import { ADD_EDIT_ROLE } from '../role.mutations';

import GetRole from './GetRole';
import Widget from 'components/Widget';
import ContainerHeader from 'components/ContainerHeader';
import ActionButtons from 'components/Forms/ActionButtons';
import RoleManagement from 'routes/corporate/roles/form/RoleManagement';
import { Role, Permission, RoleTypeEnum } from 'generated/index';
import { roleScope, roleTypes } from 'helpers/selectData';
import { customStyles } from 'components/common/styles';

const FormItem = Form.Item;

// const options = [
//   { label: 'View', value: 'View' },
//   { label: 'Add', value: 'Add' },
//   { label: 'Delete', value: 'Delete' },
//   { label: 'Edit', value: 'Edit' },
//   { label: 'Export', value: 'Export' },
// ];
export interface SaveRoleProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  role?: Role;
  permissions: Permission[];
}

interface SaveRoleResponses {
  saveRole: {
    id: string;
    name: string;
    type: RoleTypeEnum;
    permissions: Permission[];
    createdOn: Date;
    updatedOn: Date;
  };
}

interface SaveRoleVariables {
  data: Role;
}

class SaveRole extends Component<SaveRoleProps> {
  // roleList: any = this.props.role ? this.props.role : ({} as Role);
  // state = {
  //   values: this.roleList.permissions ? this.roleList.permissions : ['0'],
  // };

  // componentDidMount() {
  //   const role = this.props.role ? this.props.role : ({} as Role);
  //   this.props.form.setFieldsValue({
  //     id: role.id,
  //     name: role.name,
  //     type: role.type,
  //   });
  // }

  submitForm = (addEditRole: MutationFunction<SaveRoleResponses, SaveRoleVariables>) => {
    const form = this.props.form;
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        return false;
      }

      values.type = values.type.value;
      values.scope = values.scope.value;

      const result = await addEditRole({ variables: { data: values } });
      if (result && result.data) {
        form.resetFields();
        this.props.history.push('/corporate/roles');
      }
    });
  };

  cancel = () => {
    this.props.history.push('/corporate/roles');
  };

  render() {
    const {
      form: { getFieldDecorator },
      // location,
      permissions
    } = this.props;
    // const id = location.state ? location.state.id : undefined;

    return (
      <Mutation<SaveRoleResponses, SaveRoleVariables> mutation={ADD_EDIT_ROLE}>
        {(addEditRole, { error: mutationError }) => {
          const handleSubmit = (e: FormEvent<any>) => {
            e.preventDefault();
            this.submitForm(addEditRole);
          };

          // const isEditMode = this.props.role ? true : false;
          // console.log('this.props.role', this.props.role);
          const role: Role = this.props.role || ({ permissions: [{ privileges: [] }] } as any);

          return (
            <Form layout="vertical" onSubmit={handleSubmit} className="role-form">
              <ContainerHeader
                title="Roles"
                subheading="An Administration view of all Roles."
                icon="pe-7s-display1 icon-gradient bg-premium-dark"
                actions={<ActionButtons onCancel={this.cancel} submitText="Save Role" />}
              />
              <Widget>
                <GraphQLError error={mutationError} />
                <Row type="flex" gutter={10}>
                  <Col xs={24} sm={12}>
                    {getFieldDecorator('id', {
                      initialValue: role.id
                    })(<Input placeholder="id" type="hidden" />)}
                    {getFieldDecorator('scope', {
                      initialValue: role.scope
                    })(<Input type="hidden" />)}
                    <FormItem label="Name">
                      {getFieldDecorator('name', {
                        initialValue: role.name,
                        rules: [
                          {
                            required: true,
                            message: 'Please input name!'
                          }
                        ]
                      })(<Input placeholder="name" />)}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={6}>
                    <FormItem label="Type">
                      {getFieldDecorator('type', {
                        initialValue: role.type ? { value: role.type, label: role.type } : null,
                        rules: [
                          {
                            required: true,
                            message: 'Please select role type'
                          }
                        ]
                      })(<ReactSelect options={roleTypes} styles={customStyles} placeholder="Please select Role Type" />)}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={6}>
                    <FormItem label="Scope">
                      {getFieldDecorator('scope', {
                        initialValue: role.scope ? { value: role.scope, label: role.scope } : { value: 'Global', label: 'Global' },
                        rules: [
                          {
                            required: true,
                            message: 'Please select Role Scope'
                          }
                        ]
                      })(
                        <ReactSelect
                          isDisabled={this.props.form.getFieldValue('type').value === 'Corporate'}
                          options={roleScope}
                          styles={customStyles}
                          placeholder="Please select Role Scope"
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Widget>
              <RoleManagement form={this.props.form} role={role} permissions={permissions} />
              <Row>
                <Col xs={24} sm={24}>
                  <FormItem>
                    <ActionButtons onCancel={this.cancel} submitText="Save Role" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Form.create()(GetRole(SaveRole));
