import React from 'react';
import { List, Select, Spin, Button } from 'antd';
import { IdNameReferenceInput } from 'generated';
import debounce from 'lodash/debounce';
const { Option } = Select;

export interface IProps {
  data: IdNameReferenceInput[];
  handleSearch: any;
  handleChange: any;
  loading: boolean;
  defValue: IdNameReferenceInput[];
  placeholder: string;
}

export const SearchBox = (props: IProps) => {
  const [state, setState] = React.useState({
    defValue: props.defValue,
    value: undefined,
    filteredData: props.data,
  });

  React.useEffect(() => {
    if (!props.loading && props.data) {
      // console.log('Use eff');

      const filteredData = props.data.filter(el => {
        // removed already added items
        let found = false;
        props.defValue.forEach(def => {
          if (def.id === el.id) {
            found = true;
          }
        });
        return !found;
      });

      setState({
        ...state,
        filteredData: filteredData,
      });
    }

    handleSearchDebounce.cancel(); // On un-mount to remove the debounce fixes error on quick change of page
    // eslint-disable-next-line
  }, [props.loading]);

  const remove = (item: any) => {
    const index = state.defValue.indexOf(item, 0);
    if (index > -1) {
      state.defValue.splice(index, 1);
      state.filteredData.push(item);
    }

    setState({ ...state, defValue: state.defValue, filteredData: state.filteredData });
  };

  const handleChange = (listIds: string[]) => {
    const res = props.data.filter(o => {
      return listIds.some(o2 => {
        return o.id === o2;
      });
    });

    if (res && res.length > 0) {
      const indexFiltered = state.filteredData.indexOf(res[0], 0);
      if (indexFiltered > -1) {
        state.filteredData.splice(indexFiltered, 1);
      }
    }
    state.defValue = state.defValue.concat(res);

    setState({ ...state, defValue: state.defValue });

    props.handleChange(state.defValue);
  };

  const handleSearchDebounce = debounce((s: string) => {
    props.handleSearch(s);
  }, 1000);

  const handleSelect = (select: any) => {
    console.log(select);
  };

  const handleBlur = () => {
    props.handleSearch('');
  };

  return (
    <>
      <Select
        className="multipleDropdown"
        showSearch={false}
        notFoundContent={props.loading ? <Spin size="small" /> : null}
        placeholder={props.placeholder}
        defaultActiveFirstOption={false}
        showArrow={false}
        onSearch={handleSearchDebounce}
        onChange={handleChange}
        onSelect={handleSelect}
        onBlur={handleBlur}
        filterOption={false}
        mode="multiple"
        optionLabelProp="title"
        value={state.value}
        style={{ marginBottom: 15 }}
      >
        {state.filteredData.map(item => (
          <Option key={item.id!} title={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>
      <List
        size="small"
        bordered
        dataSource={state.defValue}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="danger" size="small" onClick={e => remove(item)} key={item.id + '_remove'}>
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta description={<div>{`${item.name}`}</div>} />
          </List.Item>
        )}
      />
    </>
  );
};

export default SearchBox;
