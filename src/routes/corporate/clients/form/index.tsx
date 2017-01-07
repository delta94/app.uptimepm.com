import GetClient from './GetClient';
import { Form, Input, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import ActionButtons from 'components/Forms/ActionButtons';
import { Client, Phone, Address, useSaveClientMutation, ClientInput, OfficeLocationTableList } from 'generated';

const FormItem = Form.Item;
export interface SaveClientProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  client: Client;
  locations: OfficeLocationTableList;
}

export interface SaveClientState {
  phones: Phone[];
  addresses: Address[];
}

export const SaveClient = (props: SaveClientProps) => {
  const { client } = props;
  const isEdit = props.client.id ? true : false;
  const [saveClient] = useSaveClientMutation();
  const form = props.form;
  const { getFieldDecorator } = form;

  const cancel = () => {
    props.history.goBack();
  };

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: ClientInput) => {
      if (err) {
        // console.log(err);
        return false;
      }

      // values.locations = removeTypename(state.location);
      // If 'client' is provided in props, then perform edit, else add the client
      const result = await saveClient({ variables: { data: values } });

      if (result && result.data) {
        form.resetFields();
        props.history.goBack();
      }
    });
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <ContainerHeader
        title={`${isEdit ? 'Edit' : 'Add'} Client`}
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={<ActionButtons onCancel={cancel} submitText="Save Client" />}
      />
      <Widget>
        {getFieldDecorator('id', {
          initialValue: client.id,
        })(<Input placeholder="id" type="hidden" />)}

        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: client.name,
            rules: [{ required: true, message: 'Please input name!' }],
          })(<Input placeholder="Name" />)}
        </FormItem>
        <FormItem label="Login Domain">
          {getFieldDecorator('loginDomain', {
            initialValue: client.loginDomain,
            rules: [{ required: true, message: 'Please login domain!' }],
          })(<Input placeholder="Login Domain" />)}
        </FormItem>
        <FormItem label="Website">
          {getFieldDecorator('website', {
            initialValue: client.website,
          })(<Input placeholder="Website" />)}
        </FormItem>
      </Widget>

      <Row>
        <ActionButtons onCancel={cancel} submitText="Save Client" />
      </Row>
    </Form>
  );
};
export default Form.create()(GetClient(SaveClient));
