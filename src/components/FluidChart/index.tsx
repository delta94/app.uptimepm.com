import React from 'react';
import CheckListFluids from './CheckListFluids';
import ChartDay from './ChartDay';
import { DatePicker, Col, Row } from 'antd';
import moment from 'moment';
import Widget from 'components/Widget';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';

export default () => {
  const [stateSelectedFluids, setStateSelectedFluids] = React.useState([] as string[]);
  const [state, setState] = React.useState({ from: moment().add(-2, 'months'), to: moment() });

  const onChangeCheckBox = (checkedList: string[]) => {
    setStateSelectedFluids(checkedList);
  };

  const onCheckAllChange = (checkedList: string[]) => {
    // console.log('Here');
    setStateSelectedFluids(checkedList);
  };

  const onCalendarChange = (e: any[]) => {
    const from = e[0];
    const to = e[1];
    setState({
      from: from,
      to: to,
    });
  };

  return (
    <>
      <Row type="flex" gutter={10}>
        <Col xs={24} sm={16}>
          <CheckListFluids onChangeCheckBox={onChangeCheckBox} onCheckAllChange={onCheckAllChange} />
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: 'right' }}>
          <RangePicker
            ranges={{
              Today: [moment(), moment()],
              'Last 30 days': [moment().add(-30, 'days'), moment().startOf('month')],
              'This month': [moment().startOf('month'), moment().endOf('month')],
              'Last month': [
                moment()
                  .add(-1, 'months')
                  .startOf('month'),
                moment()
                  .add(-1, 'months')
                  .endOf('month'),
              ],
              'Last 3 months': [
                moment()
                  .add(-3, 'months')
                  .startOf('month'),
                moment(),
              ],
            }}
            onChange={onCalendarChange}
            defaultValue={[state.from, state.to]}
            format={dateFormat}
          />
        </Col>
      </Row>
      <Row type="flex" gutter={10}>
        <Col xs={24}>
          <Widget style={{ flex: 1 }}>
            <h4>Daily Fluid Consumption</h4>
            <ChartDay selectedFluids={stateSelectedFluids} from={state.from} to={state.to} />
          </Widget>
        </Col>
      </Row>
    </>
  );
};
