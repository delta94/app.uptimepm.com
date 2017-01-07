import GetMake from './GetMake';
import { Form, Input, Row, Col } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import ActionButtons from 'components/Forms/ActionButtons';
import { Make, MakeModel, useSaveMakeMutation, MakeInput } from 'generated/index';
import Models from './Models';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
const FormItem = Form.Item;

export interface SaveMakeProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  make?: MakeInput;
}

export const SaveMake = (props: SaveMakeProps) => {
  const currentUserContext = useContext(CurrentUserContext);
  const [saveMakeMut] = useSaveMakeMutation();
  const form = props.form;
  const { getFieldDecorator } = form;
  const make: Make = props.make || ({ models: [{} as MakeModel] } as any);
  const isEditMode = make ? true : false;

  const cancel = () => {
    props.history.goBack();
  };

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: Make) => {
      if (err) {
        return false;
      }

      const result = await saveMakeMut({ variables: { data: values } });

      if (result && result.data) {
        form.resetFields();
        currentUserContext.client.cache.data.delete('ROOT_QUERY'); // Clearing from apollo cache => refresh the table with new values
        props.history.goBack();
      }
    });
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <ContainerHeader
        title={`${isEditMode ? 'Edit' : 'Add'} Make`}
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={<ActionButtons onCancel={cancel} submitText="Save Make" />}
      />
      <Widget>
        <Row>
          <Col xs={24}>
            <FormItem style={{ height: 0, padding: 0, margin: 0 }}>
              {getFieldDecorator('id', {
                initialValue: make.id,
              })(<Input placeholder="id" type="hidden" />)}
            </FormItem>

            <FormItem label="Brand">
              {getFieldDecorator('name', {
                initialValue: make.name,
                rules: [{ required: true, message: 'Please enter Brand Name!' }],
              })(<Input placeholder="Brand Name" />)}
            </FormItem>
          </Col>
        </Row>
      </Widget>

      <Widget>
        <Models form={form} models={make.models ? make.models : [{} as MakeModel]} />
      </Widget>
      <Row>
        <Col xs={24} sm={12}>
          <ActionButtons onCancel={cancel} submitText="Save Make" />
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(GetMake(SaveMake));
