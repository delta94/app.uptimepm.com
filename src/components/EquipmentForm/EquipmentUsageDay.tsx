import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, InputNumber } from 'antd';
import { ValidateStatuses } from 'components/SingleDropdown';
const FormItem = Form.Item;

export interface IProps {
  value: any;
  dayName: string;
  updateParent: any;
  inputProps: any;
}

export const EquipmentUsageDay = forwardRef((props: IProps, ref: any) => {
  const [state, setState] = React.useState({
    day: { value: props.value, validateStatus: ValidateStatuses.None, errorMsg: '' },
  });

  // Main validate method that gets called from parent Save Button
  const validate = () => {
    const monValObj = valRequiredField(state.day.value);

    setState({
      ...state,
      day: {
        ...monValObj,
        value: state.day.value,
      },
    });

    let validationStatus = ValidateStatuses.Success;
    if (monValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    return validationStatus;
  };

  React.useEffect(() => {
    // console.log('effe');
    // init state to props values on re-renders
    setState({
      day: { value: props.value, validateStatus: state.day.validateStatus, errorMsg: state.day.errorMsg },
    });
    // eslint-disable-next-line
  }, [props.value]);
  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return validate();
    },
  }));

  const valRequiredField = (value: any) => {
    // console.log(value);
    if (value === undefined || value === null)
      return {
        validateStatus: ValidateStatuses.Error,
        errorMsg: 'This is a required field',
      };

    if (value >= 0) {
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: '',
      };
    } else {
      return {
        validateStatus: ValidateStatuses.Error,
        errorMsg: 'This is a required field',
      };
    }
  };

  const updateState = (value: any) => {
    state.day.value = value;
    setState({
      ...state,
      day: {
        ...valRequiredField(value),
        value: value,
      },
    });
    props.updateParent(state.day.value);
  };

  return (
    <FormItem validateStatus={state.day.validateStatus} help={state.day.errorMsg}>
      <h5>{props.dayName} </h5>
      <InputNumber placeholder={props.dayName} min={0} {...props.inputProps} value={state.day.value} onChange={e => updateState(e)} />
    </FormItem>
  );
});

export default EquipmentUsageDay;
