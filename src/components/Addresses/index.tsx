import { Button, Form, Input, Select, Row, Col, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { Address } from 'generated/index';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps {
  form: WrappedFormUtils;
  addresses: Address[];
  isSingle?: boolean;
  isRequired?: boolean;
}

export const Addresses = (props: IProps) => {
  const [state, setState] = React.useState({
    addresses: props.addresses,
  });

  const form = props.form;
  const { getFieldDecorator } = form;
  const isRequired = props.isRequired === false ? false : true;
  const addAddress = () => {
    setState({ ...state, addresses: state.addresses.concat([{} as Address]) });
  };

  const deleteAddress = (index: number) => {
    const addresses = state.addresses;
    // if (index !== -1) {
    addresses.splice(index, 1);
    setState({ ...state, addresses: addresses.length > 0 ? addresses : [] });
    // }
  };

  return (
    <>
      {state.addresses.map((item: Address, index: number) => (
        <Row type="flex" gutter={10} key={index}>
          <Col xs={24} sm={8}>
            <FormItem label="Line One">
              {getFieldDecorator(`addresses[${index}].lineOne`, {
                initialValue: item.lineOne,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: isRequired, message: 'Please enter the address line one!' }],
              })(
                props.isSingle ? (
                  <Input placeholder="Address Line One" />
                ) : (
                  <Input addonBefore={<Icon type="delete" theme="filled" onClick={() => deleteAddress(index)} />} placeholder="Address Line One" />
                )
              )}
            </FormItem>
          </Col>

          <Col xs={24} sm={8}>
            <FormItem label="Line Two">
              {getFieldDecorator(`addresses[${index}].lineTwo`, {
                initialValue: item.lineTwo,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
              })(<Input placeholder="Address Line Two" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Line Three">
              {getFieldDecorator(`addresses[${index}].lineThree`, {
                initialValue: item.lineThree,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
              })(<Input placeholder="Address Line Three" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Type">
              {getFieldDecorator(`addresses[${index}].type`, {
                initialValue: item.type,
                rules: [{ required: isRequired, message: 'Address type is required!' }],
              })(
                <Select placeholder="Please select an address type">
                  <Option value="Mailing">Mailing</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Home">Home</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="City">
              {getFieldDecorator(`addresses[${index}].city`, {
                initialValue: item.city,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: isRequired, message: 'City is required!' }],
              })(<Input placeholder="City" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="State">
              {getFieldDecorator(`addresses[${index}].state`, {
                initialValue: item.state,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: isRequired, message: 'State is required!' }],
              })(<Input placeholder="Address State" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Postal Code">
              {getFieldDecorator(`addresses[${index}].postalCode`, {
                initialValue: item.postalCode,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: isRequired, message: 'Postal code is required!' }],
              })(<Input placeholder="Postal Code" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Country">
              {getFieldDecorator(`addresses[${index}].country`, {
                initialValue: item.country,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: isRequired, message: 'Country is required!' }],
              })(<Input placeholder="Country" />)}
            </FormItem>
          </Col>
        </Row>
      ))}
      {!props.isSingle && (
        <Row type="flex" gutter={10}>
          <Col xs={24}>
            <Button onClick={addAddress}>Add Address</Button>
          </Col>
        </Row>
      )}
    </>
  );
};
export default Addresses;
