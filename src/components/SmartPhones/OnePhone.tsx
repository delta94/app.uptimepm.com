import { Form, Input, Select, Row, Col, Icon } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Phone } from 'generated';
import { ValidateStatuses } from 'components/SingleDropdown';
import { SelectValue } from 'antd/lib/select';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps {
  item: Phone;
  isRequired?: boolean;
  index: number;
  deletePhone: any;
}

export const OnePhone = forwardRef((props: IProps, ref: any) => {
  const [state, setState] = React.useState({
    digits: { value: props.item.digits, validateStatus: ValidateStatuses.None, errorMsg: '' },
    type: { value: props.item.type, validateStatus: ValidateStatuses.None, errorMsg: '' },
    extension: { value: props.item.extension ? props.item.extension : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    item: props.item,
  });

  const valRequiredField = (value: any, fieldName: string) => {
    if (value) {
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: '',
      };
    }
    return {
      validateStatus: ValidateStatuses.Error,
      errorMsg: fieldName + ' is a required field',
    };
  };

  const handleInputChange = (evt: any) => {
    (state.item as any)[evt.target.name] = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: {
        ...valRequiredField(evt.target.value, evt.target.name),
        value: evt.target.value,
      },
      item: state.item,
    });
  };

  const handleTypeChange = (e: any, item: Phone, index: number) => {
    // console.log(e);
    state.item.type = e;
    setState({
      ...state,
      type: {
        ...valRequiredField(e, 'Type'),
        value: e,
      },
      item: state.item,
    });

    // props.updateCheckList();
  };

  // Main validate method that gets called from parent Save Button
  const validate = () => {
    const digitsValObj = valRequiredField(state.digits.value, 'Phone number');
    const typeValObj = valRequiredField(state.type.value, 'Type');

    setState({
      ...state,
      digits: {
        ...digitsValObj,
        value: state.digits.value,
      },
      type: {
        ...typeValObj,
        value: state.type.value,
      },
    });

    let validationStatus = ValidateStatuses.Success;
    if (digitsValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (typeValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    return validationStatus;
  };

  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return { status: validate(), phone: state.item };
    },
  }));

  return (
    <>
      <Row type="flex" gutter={10} key={props.index}>
        <Col xs={24} sm={8}>
          <FormItem label="Phone number" validateStatus={state.digits.validateStatus} help={state.digits.errorMsg}>
            <Input
              addonBefore={<Icon type="delete" theme="filled" onClick={() => props.deletePhone(props.index)} />}
              placeholder="Phone number"
              value={state.digits.value}
              name="digits"
              onChange={e => handleInputChange(e)}
            />
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="Type" validateStatus={state.type.validateStatus} help={state.type.errorMsg}>
            <Select
              value={state.type.value}
              placeholder="Please select a type"
              onChange={(event: SelectValue) => handleTypeChange(event, props.item, props.index)}
            >
              <Option value="Home">Home</Option>
              <Option value="Business">Business</Option>
              <Option value="Fax">Fax</Option>
              <Option value="Mobile">Mobile</Option>
              <Option value="Department">Department</Option>
              <Option value="Other">Other</Option>
            </Select>
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="Extension">
            <Input placeholder="Extension" value={state.extension.value} name="extension" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
      </Row>
    </>
  );
});
export default OnePhone;
