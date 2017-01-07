import React, { forwardRef, useImperativeHandle } from 'react';
import { Row, Col, Input, Icon } from 'antd';
import { ServiceIntervalServiceItem } from 'generated';
import FormItem from 'antd/lib/form/FormItem';
import { ValidateStatuses } from 'components/SingleDropdown';

export interface IProps {
  index: number;
  item: ServiceIntervalServiceItem;
  deleteServiceItem: any;
  handleInputChange: any;
}

export const OneServiceItem = forwardRef((props: IProps, ref: any) => {
  const [state, setState] = React.useState({
    name: { value: props.item.name ? props.item.name : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    partName: { value: props.item.partName ? props.item.partName : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    partNumber: { value: props.item.partNumber ? props.item.partNumber : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    item: props.item ? props.item : ({ isNew: true } as ServiceIntervalServiceItem),
  });

  React.useEffect(() => {
    console.log('Use effe');
    // This is needed so when a service item is deleted the new data gets set to state.
    setState({
      name: { value: props.item.name ? props.item.name : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
      partName: { value: props.item.partName ? props.item.partName : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
      partNumber: { value: props.item.partNumber ? props.item.partNumber : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
      item: props.item ? props.item : ({ isNew: true } as ServiceIntervalServiceItem),
    });
    // eslint-disable-next-line
  }, [props.item, props.item.name, props.item.partName, props.item.partNumber]);

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
        ...valRequiredField(evt.target.value, 'Service Item Description'),
        value: evt.target.value,
      },
      item: state.item,
    });
  };

  const handleOnBlurChange = (e: any) => {
    props.handleInputChange(state.item);
  };

  const validate = () => {
    const nameObj = valRequiredField(state.name.value, 'Service Item Description');

    setState({
      ...state,
      name: {
        ...nameObj,
        value: state.name.value,
      },
    });

    let validationStatus = ValidateStatuses.Success;
    if (nameObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    return validationStatus;
  };

  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return { status: validate(), serviceItem: state.item };
    },
  }));

  return (
    <>
      <Row type="flex" gutter={10}>
        <Col xs={24} sm={16}>
          <FormItem validateStatus={state.name.validateStatus} help={state.name.errorMsg}>
            <Input
              addonBefore={<Icon type="delete" theme="filled" onClick={e => props.deleteServiceItem(e, props.index)} />}
              value={state.name.value}
              name="name"
              onChange={e => handleInputChange(e)}
              onBlur={handleOnBlurChange}
              placeholder="Service Item Description"
            />
          </FormItem>
        </Col>

        <Col xs={24} sm={4}>
          <FormItem validateStatus={state.partName.validateStatus} help={state.partName.errorMsg}>
            <Input value={state.partName.value} name="partName" onChange={e => handleInputChange(e)} placeholder="Part Name" onBlur={handleOnBlurChange} />
          </FormItem>
        </Col>

        <Col xs={24} sm={4}>
          <FormItem validateStatus={state.partNumber.validateStatus} help={state.partNumber.errorMsg}>
            <Input
              value={state.partNumber.value}
              name="partNumber"
              onChange={e => handleInputChange(e)}
              placeholder="Part Number"
              onBlur={handleOnBlurChange}
            />
          </FormItem>
        </Col>
      </Row>
    </>
  );
});

export default OneServiceItem;
