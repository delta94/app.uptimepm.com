import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

interface IFieldProps {
  defValue?: any;
  fieldName: string;
  onChange: (newValue: any) => void;
  placeholder: string;
  data: any[];
  loadingData?: boolean;
}

export default (props: IFieldProps) => {
  const [state, setState] = React.useState({
    tags: props.defValue ? [props.defValue] : ([] as string[]),
  });

  const handleChange = (tags: string[]) => {
    let oneTag: string;
    const newTags = [] as string[];
    if (tags.length > 1) {
      oneTag = tags[tags.length - 1];
      newTags.push(oneTag);
    } else if (tags.length === 1) {
      oneTag = tags[0];
      newTags.push(oneTag);
    }

    setState({ ...state, tags: newTags });

    if (props.onChange) {
      if (newTags.length > 0) props.onChange(newTags[0]);
      else props.onChange(undefined);
    }
  };

  return (
    <React.Fragment>
      <Select value={state.tags} mode="tags" placeholder="Make" onChange={handleChange}>
        {props.data.map((item: any) => (
          <Option key={item.name}>{item.name}</Option>
        ))}
      </Select>
    </React.Fragment>
  );
};
