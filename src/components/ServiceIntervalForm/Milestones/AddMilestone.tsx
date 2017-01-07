import { Input, Row, Col, Switch, Icon, InputNumber, Button } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { ServiceIntervalMilestoneInput } from 'generated';

interface IProps {
  visible: boolean;
  onCancel: any;
  onCreate: any;
  meterType?: string;
}
export enum ValidateStatuses {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Validating = 'validating',
  None = ''
}

export const AddMilestone = forwardRef((props: IProps, ref: any) => {
  const [state, setState] = React.useState({
    title: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
    oneTime: { value: false, validateStatus: ValidateStatuses.None, errorMsg: '' },
    alertBeforeDue: {
      value: 0,
      validateStatus: ValidateStatuses.None,
      errorMsg: ''
    },
    meterValue: { value: 0, validateStatus: ValidateStatuses.None, errorMsg: '' },
    item: { meterValue: 0, title: '', oneTime: false, alertBeforeDue: 0 } as ServiceIntervalMilestoneInput
  });

  React.useEffect(() => {
    // On open clear previous values
    setState({
      title: { value: '', validateStatus: ValidateStatuses.None, errorMsg: '' },
      oneTime: { value: false, validateStatus: ValidateStatuses.None, errorMsg: '' },
      alertBeforeDue: {
        value: 0,
        validateStatus: ValidateStatuses.None,
        errorMsg: ''
      },
      meterValue: { value: 0, validateStatus: ValidateStatuses.None, errorMsg: '' },
      item: {} as ServiceIntervalMilestoneInput
    });
    // eslint-disable-next-line
  }, [props.visible]);

  const valRequiredField = (value: any, fieldName: string) => {
    if (value) {
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: ''
      };
    }
    return {
      validateStatus: ValidateStatuses.Error,
      errorMsg: fieldName + ' is a required field'
    };
  };

  const handleInputChange = (evt: any) => {
    (state.item as any)[evt.target.name] = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: {
        ...valRequiredField(evt.target.value, evt.target.name),
        value: evt.target.value
      },
      item: state.item
    });
  };

  const handleMeterValueChange = (value: any) => {
    state.item.meterValue = value;
    setState({
      ...state,
      meterValue: {
        ...valRequiredField(value, 'Meter Value'),
        value: value
      },
      item: state.item
    });
  };

  const handleOneTimeChange = (value: any) => {
    // console.log('value', value);
    state.item.oneTime = value;
    setState({
      ...state,
      oneTime: {
        ...state.oneTime,
        value: value
      },
      item: state.item
    });
  };

  const handleAlertBeforeDueChange = (value: any) => {
    state.item.alertBeforeDue = value;
    setState({
      ...state,
      alertBeforeDue: {
        ...valRequiredField(value, 'Alert Before Due'),
        value: value
      },
      item: state.item
    });
  };

  // Main validate method that gets called from parent Save Button
  const validate = () => {
    let validationStatus = ValidateStatuses.Success;
    const titleObj = valRequiredField(state.title.value, 'Title');
    const meterValueObj = valRequiredField(state.meterValue.value, 'Meter Value');
    const alertBeforeDueObj = valRequiredField(state.alertBeforeDue.value, 'Alert Before Due');
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
        value: state.title.value
      },
      meterValue: {
        ...meterValueObj,
        value: state.meterValue.value
      },
      alertBeforeDue: {
        ...alertBeforeDueObj,
        value: state.alertBeforeDue.value
      }
    });

    return validationStatus;
  };

  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return { status: validate(), milestone: state.item };
    }
  }));

  if (props.visible) {
    return (
      <>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={19}>
            <FormItem label="Title" validateStatus={state.title.validateStatus} help={state.title.errorMsg}>
              <Input value={state.title.value} name="title" onChange={e => handleInputChange(e)} placeholder="Title" />
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
              <InputNumber value={state.meterValue.value} name="meterValue" onChange={e => handleMeterValueChange(e)} style={{ width: '100%' }} placeholder="Meter Value" />
            </FormItem>
          </Col>

          <Col xs={24} sm={12}>
            <FormItem label={`Alert ${props.meterType} Before Service Due`} validateStatus={state.alertBeforeDue.validateStatus} help={state.alertBeforeDue.errorMsg}>
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
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" icon="double-right" style={{ width: 150 }} onClick={props.onCreate}>
              Next
            </Button>
          </Col>
        </Row>
      </>
    );
  }
  return <></>;
});
export default AddMilestone;
