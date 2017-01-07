import { Form, Input, Select, Row, Col, Icon } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import { Address } from 'generated/index';
import { ValidateStatuses } from 'components/SingleDropdown';
import { SelectValue } from 'antd/lib/select';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps {
  index: number;
  item: Address;
  isRequired?: boolean;
  deleteAddress: any;
  addAddress: any;
}

export const Addresses = forwardRef((props: IProps, ref: any) => {
  const [state, setState] = React.useState({
    lineOne: { value: props.item.lineOne, validateStatus: ValidateStatuses.None, errorMsg: '' },
    lineTwo: { value: props.item.lineTwo ? props.item.lineTwo : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    lineThree: { value: props.item.lineThree ? props.item.lineThree : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    type: { value: props.item.type, validateStatus: ValidateStatuses.None, errorMsg: '' },
    city: { value: props.item.city, validateStatus: ValidateStatuses.None, errorMsg: '' },
    state: { value: props.item.state, validateStatus: ValidateStatuses.None, errorMsg: '' },
    postalCode: { value: props.item.postalCode, validateStatus: ValidateStatuses.None, errorMsg: '' },
    country: { value: props.item.country, validateStatus: ValidateStatuses.None, errorMsg: '' },
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

  const handleTypeChange = (e: any, item: Address, index: number) => {
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
  };

  // Main validate method that gets called from parent Save Button
  const validate = () => {
    const lineOneValObj = valRequiredField(state.lineOne.value, 'Line One');
    // const lineTwoValObj = valRequiredField(state.lineTwo.value, 'Line Two');
    // const lineThreeValObj = valRequiredField(state.lineThree.value, 'Line Three');
    const typeValObj = valRequiredField(state.type.value, 'Type');
    const cityValObj = valRequiredField(state.city.value, 'City');
    const stateValObj = valRequiredField(state.state.value, 'State');
    const postalValObj = valRequiredField(state.postalCode.value, 'Postal Code');
    const countryValObj = valRequiredField(state.country.value, 'Country');

    setState({
      ...state,
      lineOne: {
        ...lineOneValObj,
        value: state.lineOne.value,
      },
      // lineTwo: {
      //   ...lineTwoValObj,
      //   value: state.lineTwo.value,
      // },
      // lineThree: {
      //   ...lineThreeValObj,
      //   value: state.lineThree.value,
      // },

      type: {
        ...typeValObj,
        value: state.type.value,
      },
      city: {
        ...cityValObj,
        value: state.city.value,
      },
      state: {
        ...stateValObj,
        value: state.state.value,
      },
      postalCode: {
        ...postalValObj,
        value: state.postalCode.value,
      },
      country: {
        ...countryValObj,
        value: state.country.value,
      },
    });

    let validationStatus = ValidateStatuses.Success;
    if (lineOneValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    // if (lineTwoValObj.validateStatus === ValidateStatuses.Error) {
    //   validationStatus = ValidateStatuses.Error;
    // }
    // if (lineThreeValObj.validateStatus === ValidateStatuses.Error) {
    //   validationStatus = ValidateStatuses.Error;
    // }
    if (typeValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (cityValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (stateValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (postalValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (countryValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    return validationStatus;
  };

  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return { status: validate(), address: state.item };
    },
  }));

  return (
    <>
      <Row type="flex" gutter={10} key={props.index}>
        <Col xs={24} sm={8}>
          <FormItem label="Line One" validateStatus={state.lineOne.validateStatus} help={state.lineOne.errorMsg}>
            <Input
              addonBefore={<Icon type="delete" theme="filled" onClick={() => props.deleteAddress(props.index)} />}
              placeholder="Address Line One"
              value={state.lineOne.value}
              name="lineOne"
              onChange={e => handleInputChange(e)}
            />
          </FormItem>
        </Col>

        <Col xs={24} sm={8}>
          <FormItem label="Line Two" validateStatus={state.lineTwo.validateStatus} help={state.lineTwo.errorMsg}>
            <Input placeholder="Address Line Two" value={state.lineTwo.value} name="lineTwo" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="Line Three" validateStatus={state.lineThree.validateStatus} help={state.lineThree.errorMsg}>
            <Input placeholder="Address Line Three" value={state.lineThree.value} name="lineThree" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="Type" validateStatus={state.type.validateStatus} help={state.type.errorMsg}>
            <Select
              value={state.type.value}
              placeholder="Please select an address type"
              onChange={(event: SelectValue) => handleTypeChange(event, props.item, props.index)}
            >
              <Option value="Mailing">Mailing</Option>
              <Option value="Business">Business</Option>
              <Option value="Home">Home</Option>
              <Option value="Other">Other</Option>
            </Select>
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="City" validateStatus={state.city.validateStatus} help={state.city.errorMsg}>
            <Input placeholder="city" value={state.city.value} name="city" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="State" validateStatus={state.state.validateStatus} help={state.state.errorMsg}>
            <Input placeholder="State" value={state.state.value} name="state" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="Postal Code" validateStatus={state.postalCode.validateStatus} help={state.postalCode.errorMsg}>
            <Input placeholder="Postal Code" value={state.postalCode.value} name="postalCode" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
        <Col xs={24} sm={8}>
          <FormItem label="Country" validateStatus={state.country.validateStatus} help={state.country.errorMsg}>
            <Input placeholder="Country" value={state.country.value} name="country" onChange={e => handleInputChange(e)} />
          </FormItem>
        </Col>
      </Row>
    </>
  );
});
export default Addresses;
