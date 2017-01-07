import React from 'react';
import { Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
const Option = Select.Option;

interface IFieldProps {
  defValue?: any;
  onChange?: (newValue: any) => void;
  names: string[]; // the names to show in the select box
  placeholder: string;
  data: any[];
  form: WrappedFormUtils;
  fieldName: string;
  required?: boolean;
  label?: string;
}

export enum ValidateStatuses {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Validating = 'validating',
  None = '',
}

export default (props: IFieldProps) => {
  const { names, placeholder, data } = props;
  const {
    form: { getFieldDecorator },
  } = props;
  const [state, setState] = React.useState({ error: ValidateStatuses.None });

  const onChange = (e: any) => {
    setState({ ...state, error: ValidateStatuses.Success });
  };

  return (
    <FormItem label={props.label}>
      {getFieldDecorator(props.fieldName, {
        initialValue: props.defValue ? props.defValue.id : undefined,
        rules: [
          {
            required: props.required ? props.required : false,
            message: `Please select a ${props.fieldName}`,
          },
        ],
      })(
        <Select placeholder={placeholder} onChange={onChange}>
          {data.map((item: any) => (
            <Option key={item.id}>
              {names.map((name: any) => {
                return item[name] + ' ';
              })}
            </Option>
          ))}
        </Select>
      )}
    </FormItem>
  );
};
