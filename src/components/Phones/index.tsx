import { Button, Form, Input, Select, Row, Col, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { Phone } from 'generated/index';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps {
  form: WrappedFormUtils;
  phones: Phone[];
  isRequired?: boolean;
}

export const PhonesList = (props: IProps) => {
  const [state, setState] = React.useState({
    phones: props.phones,
  });

  const form = props.form;
  const { getFieldDecorator } = form;
  const isRequired = props.isRequired === false ? false : true;

  const addPhone = () => {
    setState({ ...state, phones: state.phones.concat([{} as Phone]) });
  };

  const deletePhone = (index: number) => {
    const phones = state.phones;
    phones.splice(index, 1);
    setState({ ...state, phones: phones.length > 0 ? phones : [] });
  };

  return (
    <>
      {state.phones.map((item: Phone, index: number) => (
        <Row type="flex" gutter={10} key={index}>
          <Col xs={24} sm={8}>
            <FormItem label="Phone Number">
              {getFieldDecorator(`phones[${index}].digits`, {
                initialValue: item.digits,
                rules: [{ required: isRequired, message: 'Please enter the phone number!' }],
              })(<Input addonBefore={<Icon type="delete" theme="filled" onClick={() => deletePhone(index)} />} placeholder="Phone number" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Type">
              {getFieldDecorator(`phones[${index}].type`, {
                initialValue: item.type,
                rules: [{ required: isRequired, message: 'Select a phone type!' }],
              })(
                <Select placeholder="Please select a Phone Type">
                  <Option value="Home">Home</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Fax">Fax</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="Department">Department</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Extension">
              {getFieldDecorator(`phones[${index}].extension`, {
                initialValue: item.extension,
              })(<Input placeholder="Extension" />)}
            </FormItem>
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          <Button onClick={addPhone}>Add Phone</Button>
        </Col>
      </Row>
    </>
  );
};
export default PhonesList;
