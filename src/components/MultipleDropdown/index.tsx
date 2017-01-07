import React from 'react';
import { Select, Spin } from 'antd';
import { removeTypename } from 'helpers/utils';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import './index.scss';

const Option = Select.Option;
interface IProps {
  defValue?: any[]; // default value data for binding on edit
  onChange?: (newValue: any[]) => void; // method used for returning the values to parent
  names: string[]; // the names to show in the select box
  placeholder: string;
  data: any[];
  form: WrappedFormUtils;
  fieldName: string;
  loadingData?: boolean;
  onSearching?: any;
  style?: string;
  required?: boolean;
}

export default (props: IProps) => {
  const { names, placeholder, data } = props;

  const handleSearch = (search: string) => {
    if (props.onSearching) {
      props.onSearching(search);
    }
  };

  const handleChange = (value: string[]) => {
    if (props.onSearching) {
      props.onSearching('');
    }

    if (props.onChange) {
      props.onChange(value);
    }
  };

  const {
    form: { getFieldDecorator },
  } = props;

  // console.log('rending');
  // console.log(data);
  return (
    <React.Fragment>
      {getFieldDecorator(props.fieldName, {
        initialValue: props.defValue ? removeTypename(props.defValue.map(x => x.id)) : [],
        rules: [
          {
            required: props.required ? props.required : false,
            message: `Please input ${props.fieldName}!`,
            type: 'array',
          },
        ],
      })(
        <Select
          className="multipleDropdown"
          showSearch={false}
          notFoundContent={props.loadingData ? <Spin size="small" /> : null}
          placeholder={placeholder}
          defaultActiveFirstOption={false}
          showArrow={false}
          onSearch={handleSearch}
          onChange={handleChange}
          filterOption={false}
          mode="multiple"
        >
          {data.map((item: any) => (
            <Option key={item.id}>
              {names.map((name: any) => {
                return item[name] + ' ';
              })}
            </Option>
          ))}
        </Select>
      )}
    </React.Fragment>
  );
};
