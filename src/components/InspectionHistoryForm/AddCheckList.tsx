import { Col, Form, Input, Row, Select, Checkbox, InputNumber } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { InspectionChecklistItem } from 'generated';
const FormItem = Form.Item;
const Option = Select.Option;

export interface IChecklistProps {
  form: WrappedFormUtils;
  item: InspectionChecklistItem;
  index: number;
}

export default (props: IChecklistProps) => {
  const { form, index, item } = props;
  const { getFieldDecorator } = form;

  return (
    <>
      <span>
        <Row type="flex" justify="space-around" align="bottom" gutter={12}>
          <Col xs={24} sm={18}>
            <FormItem label="Title">
              {getFieldDecorator(`checklist[${index}].title`, {
                initialValue: item.title,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: true, message: 'Please enter Checklist Item Title!' }],
              })(<Input placeholder="Checklist Item Title" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Type">
              {getFieldDecorator(`checklist[${index}].type`, {
                initialValue: item.type,
                rules: [{ required: true, message: 'Please select an equipment type!' }],
              })(
                <Select placeholder="Please select a type">
                  <Option value="TextInput">Text Input</Option>
                  <Option value="NumericInput">Number Input</Option>
                  <Option value="Status">Status</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" key={index} align="top" gutter={12}>
          <Col xs={12} sm={4}>
            <FormItem>
              {getFieldDecorator(`checklist[${index}].consumable`, {
                initialValue: item.consumable,
                rules: [{ required: false }],
              })(<Checkbox defaultChecked={false}>Consumable</Checkbox>)}
            </FormItem>
          </Col>
          <Col xs={12} sm={12}>
            <FormItem label="Consumable Amount">
              {getFieldDecorator(`checklist[${index}].consumableAmount`, {
                initialValue: item.consumableAmount,

                rules: [{ required: false, message: 'Please enter consumable amount!' }],
              })(<InputNumber min={0} step={0.1} placeholder="Consumable Amount" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={24}>
            <FormItem label="Consumable Unit Of Measure">
              {getFieldDecorator(`checklist[${index}].consumableUnitOfMeasure`, {
                initialValue: item.consumableUnitOfMeasure,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: false, message: 'Please enter Consumable Unit Of Measure!' }],
              })(<Input placeholder="Consumable Unit Of Measure" />)}
            </FormItem>
          </Col>
        </Row>
      </span>
    </>
  );
};
