import React from 'react';
import { Select, Spin, List, Button } from 'antd';
import { DealerContactInput } from 'generated';
import debounce from 'lodash/debounce';
const { Option } = Select;

export interface IProps {
  data: DealerContactInput[];
  handleSearch: any;
  handleChange: any;
  loading: boolean;
  defValue: DealerContactInput[];
  placeholder: string;
  type: string;
}

export const DealerContactBox = (props: IProps) => {
  const [state, setState] = React.useState({
    defValue: props.defValue,
    value: undefined,
    filteredData: props.data,
  });

  React.useEffect(() => {
    if (!props.loading && props.data) {
      // console.log('Use eff');
      const filteredData = props.data.filter(el => {
        if (!el.representativeType) console.log('Where is type');
        // if (el.type !== props.type) return false; //rm other types
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
        defValue: props.defValue,
        filteredData: filteredData,
      });
    }

    handleSearchDebounce.cancel(); // On un-mount to remove the debounce fixes error on quick change of page
    // eslint-disable-next-line
  }, [props.loading, props.defValue]);

  const remove = (item: any) => {
    const index = state.defValue.indexOf(item, 0);
    if (index > -1) {
      state.defValue.splice(index, 1);
      state.filteredData.push(item);
    }

    setState({ ...state, defValue: state.defValue, filteredData: state.filteredData });
    props.handleChange(state.defValue);
  };

  const handleChange = (listIds: string[]) => {
    const res = props.data.filter(o => {
      return listIds.some(o2 => {
        return o.id === o2;
      });
    });

    if (res.length > 0) {
      const indexFiltered = state.filteredData.indexOf(res[0], 0);
      if (indexFiltered > -1) {
        state.filteredData.splice(indexFiltered, 1);
      }
    }
    state.defValue = state.defValue.concat(res);

    setState({ ...state, defValue: state.defValue });
    // console.log(state.defValue);
    props.handleChange(state.defValue, props.type);
  };

  const handleSearchDebounce = debounce((s: string) => {
    props.handleSearch(s, props.type);
  }, 1000);

  const handleSelect = (select: any) => {
    console.log(select);
  };

  const handleBlur = () => {
    props.handleSearch('', props.type);
  };

  const formatEmail = (email?: string | null | undefined) => {
    if (email) return '<' + email + '>';
    return '';
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
        value={state.value}
        style={{ marginBottom: 15 }}
      >
        {state.filteredData.map(item => (
          <Option key={item.id!}>{<span>{`${item.firstName} ${item.lastName}  ${formatEmail(item.email)} `}</span>}</Option>
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
            <List.Item.Meta description={<div>{`${item.firstName} ${item.lastName} ${formatEmail(item.email)} `}</div>} />
          </List.Item>
        )}
      />
    </>
  );
};

export default DealerContactBox;
