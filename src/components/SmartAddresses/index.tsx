import { Button, Row, Col } from 'antd';
import React, { forwardRef, createRef, useRef, useImperativeHandle } from 'react';
import { Address } from 'generated';
import OneAddress from './OneAddress';
import { ValidateStatuses } from 'components/SingleDropdown';

export interface IProps {
  addresses: Address[];
  isSingle?: boolean;
  isRequired?: boolean;
}

export const SmartAddresses = forwardRef((props: IProps, ref: any) => {
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
      const addressList = [];
      for (let ii = 0; ii < state.addresses.length; ii++) {
        const { status: childValidationStatus, address } = refs.current[ii].current.validateChild();
        if (childValidationStatus === ValidateStatuses.Error) {
          returnValue = true;
        }
        addressList.push(address);
      }
      return { status: returnValue, addressList: addressList };
    },
  }));

  const [state, setState] = React.useState({
    addresses: props.addresses,
  });

  const addAddress = () => {
    setState({ ...state, addresses: state.addresses.concat([{} as Address]) });
  };

  const deleteAddress = (index: number) => {
    const addresses = state.addresses;
    // if (index !== -1) {
    addresses.splice(index, 1);
    setState({ ...state, addresses: addresses.length > 0 ? addresses : [] });
    // }
  };

  return (
    <>
      {state.addresses.map((item: Address, index: number) => (
        <OneAddress ref={refs.current[index]} key={'Address_' + index} index={index} item={item} addAddress={addAddress} deleteAddress={deleteAddress} />
      ))}
      {!props.isSingle && (
        <Row type="flex" gutter={10}>
          <Col xs={24}>
            <Button onClick={addAddress}>Add Address</Button>
          </Col>
        </Row>
      )}
    </>
  );
});
export default SmartAddresses;
