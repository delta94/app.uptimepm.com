import React from 'react';
import { Checkbox } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { useChartDayQuery } from 'generated';

interface IProps {
  onChangeCheckBox: any;
  onCheckAllChange: any;
}

const CheckListFluids = (props: IProps) => {
  const { loading, data } = useChartDayQuery(); // need this call to get all the fluids
  const [state, setState] = React.useState({
    checkedList: [] as string[],
    indeterminate: true,
    checkAll: false,
  });

  React.useEffect(() => {
    if (!loading && data) {
      // console.log('Use eff');
      setState({
        ...state,
        checkedList: data.chartDay.fluidNames,
        checkAll: true,
        indeterminate: false,
      });
      props.onCheckAllChange(data.chartDay.fluidNames);
    }
    // eslint-disable-next-line
  }, [loading]);

  const onChangeCheckBox = (checkedList: any) => {
    setState({
      ...state,
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < data!.chartDay.fluidNames.length,
      checkAll: checkedList.length === data!.chartDay.fluidNames.length,
    });

    props.onChangeCheckBox(checkedList);
  };

  const onCheckAllChange = (e: any) => {
    if (data) {
      const checkedList = e.target.checked ? data.chartDay.fluidNames : [];
      setState({
        ...state,
        checkedList: checkedList,
        indeterminate: false,
        checkAll: e.target.checked,
      });
      // console.log('onCheckAllChange;;');

      props.onCheckAllChange(checkedList);
    }
  };

  return (
    <>
      {!loading && data && data.chartDay && (
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox indeterminate={state.indeterminate} onChange={onCheckAllChange} checked={state.checkAll}>
              Check all
            </Checkbox>
          </div>
          <br />
          <CheckboxGroup value={state.checkedList} options={data.chartDay.fluidNames} onChange={onChangeCheckBox} />
        </div>
      )}
    </>
  );
};

export default CheckListFluids;
