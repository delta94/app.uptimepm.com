import React, { forwardRef, createRef, useRef, useImperativeHandle } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { ServiceIntervalServiceItem } from 'generated';
import { ValidateStatuses } from 'components/SingleDropdown';
import OneServiceItem from './OneServiceItem';
import { getServiceItemId } from 'helpers/utils';

export interface IProps {
  serviceItems: ServiceIntervalServiceItem[];
  milestoneOrderId: number;
  handleInputChange: any;
}

export const ServiceItems = forwardRef((props: IProps, ref: any) => {
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
      const serviceItems = [];
      for (let ii = 0; ii < state.serviceItems.length; ii++) {
        const { status: childValidationStatus, serviceItem } = refs.current[ii].current.validateChild();
        if (childValidationStatus === ValidateStatuses.Error) {
          returnValue = true;
        }
        serviceItems.push(serviceItem);
      }
      return { status: returnValue, serviceItems: serviceItems };
    },
  }));

  const [state, setState] = React.useState<{ serviceItems: ServiceIntervalServiceItem[] }>({
    serviceItems: props.serviceItems,
  });

  React.useEffect(() => {
    setState({
      serviceItems: props.serviceItems,
    });
  }, [props.serviceItems]);

  const addServiceItem = () => {
    setState({
      serviceItems: state.serviceItems.concat([
        { id: getServiceItemId(), fromMilestoneId: props.milestoneOrderId.toString(), isNew: true, name: '', partName: '', partNumber: '' },
      ]),
    });
  };

  const deleteServiceItem = (e: any, index: number) => {
    setState({
      ...state,
      serviceItems:
        state.serviceItems.length > 0
          ? state.serviceItems.filter((x, currentIndex) => {
              // console.log(currentIndex);
              return currentIndex !== index;
            })
          : [],
    });
  };
  return (
    <>
      {state.serviceItems.map((item: ServiceIntervalServiceItem, index: number) => (
        <div key={`${item.id}|${index}`}>
          {/* <h3>
            {item.id} - {item.fromMilestoneId}
          </h3> */}
          <OneServiceItem
            handleInputChange={props.handleInputChange}
            // key={`${item.id}|${index}`}
            ref={refs.current[index]}
            index={index}
            item={item}
            deleteServiceItem={(e: any) => deleteServiceItem(e, index)}
          />
        </div>
      ))}
      <Row type="flex" gutter={10}>
        <Col xs={24}>
          <Button onClick={addServiceItem}>
            <Icon type="plus" /> Add Service Item
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default ServiceItems;
