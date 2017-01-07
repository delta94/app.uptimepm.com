import { Button, Row, Col } from 'antd';
import React, { forwardRef, createRef, useRef, useImperativeHandle } from 'react';
import { Phone } from 'generated';
import OnePhone from './OnePhone';
import { ValidateStatuses } from 'components/SingleDropdown';

export interface IProps {
  phones: Phone[];
  isRequired?: boolean;
}

export const SmartPhones = forwardRef((props: IProps, ref: any) => {
  const arr = [];
  for (let ii = 0; ii < 1000; ii++) {
    // Init 1000 references, has to be declared manually.
    arr.push(createRef<any>());
  }
  const refs = useRef(arr);

  // Gets called from parent needed for validation on save button
  useImperativeHandle(ref, () => ({
    initValidation() {
      let returnValue = false;
      const phoneList = [];
      for (let ii = 0; ii < state.phones.length; ii++) {
        const { status: childValidationStatus, phone } = refs.current[ii].current.validateChild();
        if (childValidationStatus === ValidateStatuses.Error) {
          returnValue = true;
        }
        phoneList.push(phone);
      }
      // console.log(phoneList);
      return { status: returnValue, phoneList: phoneList };
    },
  }));

  const [state, setState] = React.useState({
    phones: props.phones,
  });

  const isRequired = props.isRequired === false ? false : true;

  const addPhone = () => {
    setState({ ...state, phones: state.phones.concat([{} as Phone]) });
  };

  const deletePhone = (index: number) => {
    const phones = state.phones;
    phones.splice(index, 1);
    setState({ ...state, phones: phones.length > 0 ? phones : [] });
  };

  return (
    <>
      {state.phones.map((item: Phone, index: number) => (
        <OnePhone ref={refs.current[index]} key={index} item={item} isRequired={isRequired} index={index} deletePhone={deletePhone} />
      ))}
      <Row>
        <Col>
          <Button onClick={addPhone}>Add Phone</Button>
        </Col>
      </Row>
    </>
  );
});
export default SmartPhones;
