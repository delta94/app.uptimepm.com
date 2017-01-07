import React, { forwardRef, useImperativeHandle, createRef, useRef } from 'react';
import { Row, Col, Button } from 'antd';
import ContainerHeader from 'components/ContainerHeader';
import { ExpectedUsage } from 'generated';
import { ValidateStatuses } from 'components/SingleDropdown';
import { EquipmentUsageDay } from './EquipmentUsageDay';

export interface IProps {
  expectedUsage: ExpectedUsage;
  onChange: any;
  meterType: string;
}

export enum DayEnum {
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
  Sun = 7,
}

export const EquipmentUsage = forwardRef((props: IProps, ref: any) => {
  const [state, setState] = React.useState({
    expectedUsage: props.expectedUsage,
  });

  const setDefault = () => {
    if (props.meterType === 'Hours') {
      state.expectedUsage.mon = 8;
      state.expectedUsage.tue = 8;
      state.expectedUsage.wed = 8;
      state.expectedUsage.thu = 8;
      state.expectedUsage.fri = 8;
      state.expectedUsage.sat = 0;
      state.expectedUsage.sun = 0;
    } else {
      state.expectedUsage.mon = 100;
      state.expectedUsage.tue = 100;
      state.expectedUsage.wed = 100;
      state.expectedUsage.thu = 100;
      state.expectedUsage.fri = 100;
      state.expectedUsage.sat = 0;
      state.expectedUsage.sun = 0;
    }
    setState({
      ...state,
      expectedUsage: state.expectedUsage,
    });
    props.onChange(state.expectedUsage);
  };

  // useEffect(() => {
  //   setDefault();
  // }, [props.meterType]);

  let inputProps = {};
  if (props.meterType === 'Hours') {
    inputProps = {
      max: 24,
    };
  }

  const arr = [];
  for (let ii = 0; ii < 7; ii++) {
    arr.push(createRef<any>());
  }
  const refs = useRef(arr);

  // Gets called from parent needed for validation on save button
  useImperativeHandle(ref, () => ({
    initValidation() {
      let returnValue = false;
      for (let ii = 0; ii < 7; ii++) {
        const childValidationStatus = refs.current[ii].current.validateChild();
        if (childValidationStatus === ValidateStatuses.Error) {
          returnValue = true;
        }
      }
      return returnValue;
    },
  }));

  const clear = () => {
    delete state.expectedUsage.mon;
    delete state.expectedUsage.tue;
    delete state.expectedUsage.wed;
    delete state.expectedUsage.thu;
    delete state.expectedUsage.fri;
    delete state.expectedUsage.sat;
    delete state.expectedUsage.sun;
    setState({
      ...state,
      expectedUsage: state.expectedUsage,
    });
    props.onChange(state.expectedUsage);
  };

  const updateState = (value: any, day: DayEnum) => {
    const strDay = DayEnum[day].toLowerCase();
    const temp = state.expectedUsage as any;
    temp[strDay] = value;
    props.onChange(state.expectedUsage);
  };

  const getTitle = () => {
    if (props.meterType) return 'Expected Usage (' + props.meterType + ')';
    else return 'Expected Usage';
  };

  const days = [DayEnum.Mon, DayEnum.Tue, DayEnum.Wed, DayEnum.Thu, DayEnum.Fri, DayEnum.Sat, DayEnum.Sun];

  const getValue = (day: DayEnum) => {
    const strDay = DayEnum[day].toLowerCase();
    const temp = state.expectedUsage as any;
    return temp[strDay];
  };

  return (
    <>
      <ContainerHeader
        title={getTitle()}
        subheading="Please insert expected usage"
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={
          <Row gutter={10} type="flex">
            <Col>
              <Button onClick={setDefault}>Set Default</Button>
            </Col>
            <Col>
              <Button className="cancel-btn" onClick={clear}>
                Clear
              </Button>
            </Col>
          </Row>
        }
      />

      <Row type="flex" gutter={10}>
        {days.map((day: DayEnum, index: number) => (
          <Col key={index} xs={12} sm={3}>
            <EquipmentUsageDay
              key={index}
              ref={refs.current[index]}
              inputProps={inputProps}
              dayName={DayEnum[day]}
              value={getValue(day)}
              updateParent={(e: any) => updateState(e, day)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
});

export default EquipmentUsage;
