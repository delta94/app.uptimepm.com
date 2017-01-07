import { Button, Form, Input, Select, Row, Col, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { MakeModel, MakeModelInput } from 'generated/index';
const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps {
  form: WrappedFormUtils;
  models: MakeModelInput[];
}

export const Models = (props: IProps) => {
  const [state, setState] = React.useState({
    models: props.models,
  });
  const form = props.form;
  const { getFieldDecorator } = form;
  const add = () => {
    setState(prevState => ({
      models: prevState.models.concat([{} as MakeModel]),
    }));
  };

  const remove = (index: number) => {
    const models = state.models;
    if (index !== -1) {
      models.splice(index, 1);
      setState({
        models: models.length > 0 ? models : [{} as MakeModel],
      });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h3>Models</h3>
        </Col>
      </Row>

      {state.models.map((item: MakeModel, index: number) => (
        <Row type="flex" gutter={10} key={index}>
          <Col xs={24} sm={8}>
            <FormItem label="Name">
              {getFieldDecorator(`models[${index}].name`, {
                initialValue: item.name,
                rules: [{ required: false, message: 'Please enter Model Name!' }],
              })(<Input addonBefore={<Icon type="delete" theme="filled" onClick={() => remove(index)} />} placeholder="Model Name" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Type">
              {getFieldDecorator(`models[${index}].equipmentType`, {
                initialValue: item.equipmentType,
                rules: [{ required: false, message: 'Select an equipment type!' }],
              })(
                <Select placeholder="Please select an Equipment Type">
                  <Option value="Tracked">Tracked</Option>
                  <Option value="Wheeled">Wheeled</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={7}>
            <FormItem>{index + 1 === state.models.length && <Button onClick={add}>Add Another</Button>}</FormItem>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default Models;
