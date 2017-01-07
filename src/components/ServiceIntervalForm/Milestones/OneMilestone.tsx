import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Row, Col, Input, Icon, InputNumber, Switch } from 'antd';
import { ServiceIntervalMilestoneInput, ServiceIntervalMilestone, ServiceIntervalServiceItemInput } from 'generated';
import FormItem from 'antd/lib/form/FormItem';
import { ValidateStatuses } from 'components/SingleDropdown';
import ServiceItems from '../ServiceItems';
import { clone } from 'lodash';

export interface IProps {
  index: number;
  item: ServiceIntervalMilestone;
  isRequired?: boolean;
  deleteMilestone: any;
  meterType?: string;
  milestoneId: number;
  handleInputChange: any;
}

export const OneMilestone = forwardRef((props: IProps, ref: any) => {
  const childRef = useRef<any>(null);
  const [state, setState] = React.useState({
    title: { value: props.item.title ? props.item.title : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    oneTime: { value: props.item.oneTime ? props.item.oneTime : false, validateStatus: ValidateStatuses.None, errorMsg: '' },
    alertBeforeDue: {
      value: props.item.alertBeforeDue ? props.item.alertBeforeDue : 0,
      validateStatus: ValidateStatuses.None,
      errorMsg: '',
    },
    meterValue: { value: props.item.meterValue ? props.item.meterValue : 0, validateStatus: ValidateStatuses.None, errorMsg: '' },
    item: props.item ? props.item : ({ id: props.milestoneId } as ServiceIntervalMilestoneInput),
    serviceItems: props.item.serviceItems ? props.item.serviceItems : [{ name: '' } as ServiceIntervalServiceItemInput],
  });

  React.useEffect(() => {
    // console.log('Use eff one mielstone');
    // This is needed so when a new milestone is inserted the new data gets set to state.
    if (!state.item.id) state.item.id = props.index;
    setState({
      title: { value: props.item.title ? props.item.title : '', validateStatus: ValidateStatuses.None, errorMsg: '' },
      oneTime: { value: props.item.oneTime ? props.item.oneTime : false, validateStatus: ValidateStatuses.None, errorMsg: '' },
      alertBeforeDue: {
        value: props.item.alertBeforeDue ? props.item.alertBeforeDue : 0,
        validateStatus: ValidateStatuses.None,
        errorMsg: '',
      },
      meterValue: { value: props.item.meterValue ? props.item.meterValue : 0, validateStatus: ValidateStatuses.None, errorMsg: '' },
      item: props.item ? props.item : ({ id: props.milestoneId } as ServiceIntervalMilestoneInput),
      serviceItems: props.item.serviceItems ? props.item.serviceItems : [{ name: '' } as ServiceIntervalServiceItemInput],
    });
    // eslint-disable-next-line
  }, [props.item, props.item.serviceItems]);

  const handleInputChange = (evt: any) => {
    console.log('[handleInputChange] evt.target.value', evt.target.value);
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

  const handleMeterValueChange = (value: any) => {
    state.item.meterValue = value;
    setState({
      ...state,
      meterValue: {
        ...valRequiredField(value, 'Meter Value'),
        value: value,
      },
      item: state.item,
    });
  };

  const handleAlertBeforeDueChange = (value: any) => {
    state.item.alertBeforeDue = value;
    setState({
      ...state,
      alertBeforeDue: {
        ...valRequiredField(value, 'Alert Before Due'),
        value: value,
      },
      item: state.item,
    });
  };

  const handleOneTimeChange = (value: any) => {
    // console.log('value', value);
    state.item.oneTime = value;
    setState({
      ...state,
      oneTime: {
        ...state.oneTime,
        value: value,
      },
      item: state.item,
    });
  };

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

  const validate = () => {
    let validationStatus = ValidateStatuses.Success;
    const titleObj = valRequiredField(state.title.value, 'Title');
    const meterValueObj = valRequiredField(state.meterValue.value, 'Meter Value');
    const alertBeforeDueObj = valRequiredField(state.meterValue.value, 'Alert Before Due');

    // validate Service Items
    const serviceItemsResponse = childRef.current!.initValidation();
    // console.log(serviceItemsResponse);
    if (serviceItemsResponse.status) {
      validationStatus = ValidateStatuses.Error;
    } else {
      state.item.serviceItems = serviceItemsResponse.serviceItems;
    }

    if (titleObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (meterValueObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (alertBeforeDueObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    setState({
      ...state,
      title: {
        ...titleObj,
        value: state.title.value,
      },
      meterValue: {
        ...meterValueObj,
        value: state.meterValue.value,
      },
      alertBeforeDue: {
        ...alertBeforeDueObj,
        value: state.alertBeforeDue.value,
      },
    });

    return validationStatus;
  };

  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return { status: validate(), milestone: state.item };
    },
  }));

  return (
    <>
      <Row type="flex" gutter={10}>
        <Col xs={24} sm={19}>
          <FormItem label="Title" validateStatus={state.title.validateStatus} help={state.title.errorMsg}>
            <Input
              addonBefore={<Icon type="delete" theme="filled" onClick={() => props.deleteMilestone(props.index)} />}
              value={state.title.value}
              name="title"
              onChange={e => handleInputChange(e)}
              placeholder="Title"
            />
          </FormItem>
        </Col>
        <Col xs={24} sm={5} style={{ flex: 1, display: 'flex', justifyItems: 'flex-end', alignItems: 'center' }}>
          <span style={{ marginRight: 10, marginTop: 3, fontWeight: 600 }}>Initial Service</span>
          <Switch
            style={{ margin: '6px 0 6px' }}
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="close" />}
            onChange={e => handleOneTimeChange(e)}
            checked={state.oneTime.value}
          />
        </Col>
      </Row>
      <Row type="flex" gutter={10}>
        <Col xs={24} sm={12}>
          <FormItem label={`${props.meterType} When Service Due`} validateStatus={state.meterValue.validateStatus} help={state.meterValue.errorMsg}>
            <InputNumber
              value={state.meterValue.value}
              name="meterValue"
              onChange={e => handleMeterValueChange(e)}
              style={{ width: '100%' }}
              placeholder="Meter Value"
            />
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem
            label={`Alert ${props.meterType} Before Service Due`}
            validateStatus={state.alertBeforeDue.validateStatus}
            help={state.alertBeforeDue.errorMsg}
          >
            <InputNumber
              value={state.alertBeforeDue.value}
              name="alertBeforeDue"
              onChange={e => handleAlertBeforeDueChange(e)}
              style={{ width: '100%' }}
              placeholder="Alert Before Due"
            />
          </FormItem>
        </Col>
      </Row>
      <h5>Service Items</h5>
      <ServiceItems
        handleInputChange={props.handleInputChange}
        // key={'ServiceItems_' + props.milestoneId}
        milestoneOrderId={props.milestoneId}
        serviceItems={state.item && state.item.serviceItems ? clone(state.item.serviceItems) : []}
        ref={childRef}
      />
    </>
  );
});

export default OneMilestone;
