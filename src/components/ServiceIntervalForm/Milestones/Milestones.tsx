import React, { forwardRef, createRef, useRef, useImperativeHandle } from 'react';
import { Tabs, Icon } from 'antd';
import { ServiceIntervalMilestone, ServiceIntervalServiceItem } from 'generated';
import { ValidateStatuses } from 'components/SingleDropdown';
import OneMilestone from './OneMilestone';
import Widget from 'components/Widget';
import { insertSlice } from 'helpers/utils';
import AddMilestone from './AddMilestone';
import { uniqBy } from 'lodash';

export interface IProps {
  milestones: ServiceIntervalMilestone[];
  meterType?: string;
}

export const Milestones = forwardRef((props: IProps, ref: any) => {
  const arr = [];
  for (let ii = 0; ii < 1000; ii++) {
    // Init 1000 references, has to be declared manually.
    arr.push(createRef<any>());
  }
  const refs = useRef(arr);
  const childRefForm = useRef<any>(null);

  const [state, setState] = React.useState({
    milestones: props.milestones,
    activeTab:
      props.milestones && props.milestones.length
        ? `${(0).toString()}|${props.milestones[0].meterValue.toString()}|${props.milestones[0].oneTime ? 'I' : 'R'}`
        : '999999',
    modalVisible: false,
  });

  // Gets called from parent needed for validation on save button
  useImperativeHandle(ref, () => ({
    initValidation() {
      let returnValue = false;
      const milestones = [] as ServiceIntervalMilestone[];

      for (let ii = 0; ii < state.milestones.length; ii++) {
        const { status: childValidationStatus, milestone } = refs.current[ii].current.validateChild();
        if (childValidationStatus === ValidateStatuses.Error) {
          returnValue = true;
        }

        if (milestone.serviceItems) {
          milestone.serviceItems.forEach((v: ServiceIntervalServiceItem) => {
            delete v.isNew;
          });
        }
        milestones.push(milestone);
      }

      return { status: returnValue, milestones: milestones };
    },
  }));

  const deleteMilestone = (index: number) => {
    const milestones = state.milestones;
    milestones.splice(index, 1);
    setState({ ...state, milestones: milestones.length > 0 ? milestones : [], activeTab: 'state.milestones.length' });
  };

  const handleModalCancel = () => {
    setState({ ...state });
  };

  const handleAddMilestone = () => {
    const addData = childRefForm.current!.validateChild();
    if (addData.status !== ValidateStatuses.Success) {
      console.log(addData);
      return false;
    }
    console.log(addData.milestone);

    const newMile: ServiceIntervalMilestone = {
      title: addData.milestone.title,
      alertBeforeDue: addData.milestone.alertBeforeDue,
      meterValue: addData.milestone.meterValue,
      oneTime: addData.milestone.oneTime,
      id: addData.milestone.id,
    };

    let position = state.milestones.length; // position at last
    let newMilestones = state.milestones;
    let activeTab = '';
    if (newMile.oneTime) {
      // if initial service true
      if (state.milestones.length > 0 && state.milestones[0].oneTime) {
        for (let i = 0; i < state.milestones.length; i++) {
          // find new position
          const currentMile = state.milestones[i];
          if (currentMile.oneTime && currentMile.meterValue > newMile.meterValue) {
            position = i;
            break;
          } else if (!currentMile.oneTime && currentMile.meterValue > newMile.meterValue) {
            position = i;
            break;
          }
        }
      } else {
        position = 0;
      }

      state.milestones = insertSlice(state.milestones, position, newMile);
      newMilestones = state.milestones;
      activeTab = `${position}|${newMile.meterValue.toString()}|${newMile.oneTime ? 'I' : 'R'}`;
    } else {
      for (let i = 0; i < state.milestones.length; i++) {
        console.log('pos=', i);
        // find new position
        const currentMile = state.milestones[i];
        console.log('currentMile=', currentMile);
        console.log('newMile=', newMile);

        if (!currentMile.oneTime && currentMile.meterValue > newMile.meterValue) {
          position = i;
          break;
        }
      }
      const recurringMilestones = state.milestones.filter(x => !x.oneTime && x.meterValue < newMile.meterValue);
      newMile.serviceItems = [];
      recurringMilestones.forEach(recurringMilestone => {
        if (recurringMilestone.serviceItems) {
          newMile.serviceItems = newMile.serviceItems!.concat(recurringMilestone.serviceItems);
          newMile.serviceItems = uniqBy(newMile.serviceItems, 'id');
        }
      });
      newMilestones = insertSlice(state.milestones, position, newMile);
      activeTab = `${position}|${newMile.meterValue}|${newMile.oneTime ? 'I' : 'R'}`;
    }

    setState({ ...state, milestones: newMilestones, activeTab });
  };

  const handleServiceItemChange = (newItem: ServiceIntervalServiceItem, milestoneIndex: number) => {
    console.log('handleServiceItemChange', newItem, milestoneIndex);

    const milestones = state.milestones;
    if (milestones[milestoneIndex].oneTime) return;
    if (!milestones[milestoneIndex].serviceItems!.find(x => x.id === newItem.id)) {
      console.log('Inserting');
      milestones[milestoneIndex].serviceItems!.push(newItem);
    }

    for (let j = milestoneIndex + 1; j < milestones.length; j++) {
      // 0,1,2   => 1     index=1
      if (newItem.isNew) {
        // check if new items added and update if missing.
        // Find position where to insert the newItems in parent milestones and insert it.
        let position = milestones[j].serviceItems!.length;
        for (let k = 0; k < milestones[j].serviceItems!.length; k++) {
          if (milestones[j].serviceItems![k].fromMilestoneId! === newItem.fromMilestoneId!) {
            position = k + 1;
          }
        }

        // check for duplicates and prevent from bigger to lower milestone insert
        if (!milestones[j].serviceItems!.find(x => x.id === newItem.id)) {
          milestones[j].serviceItems! = insertSlice(milestones[j].serviceItems!, position, newItem);
        }
        if (j === milestones.length - milestoneIndex - 1) {
          console.log('deleting flag isNew');
          delete newItem.isNew; // clear isNew flag so update would be called
        }
      } else {
        console.log('do update');
        const foundServiceItem = milestones[j].serviceItems!.find(x => x.id === newItem.id);
        if (foundServiceItem) {
          foundServiceItem.name = newItem.name;
          foundServiceItem.partName = newItem.partName;
          foundServiceItem.partNumber = newItem.partNumber;
          console.log('updating');
        }
      }
    }

    setState({
      ...state,
      milestones: milestones,
    });
  };

  const getKey = (index: number, item: any) => {
    return `${index}|${item.meterValue}|${item.oneTime ? 'I' : 'R'}`;
  };

  return (
    <>
      <Tabs
        activeKey={state.activeTab}
        onChange={activeKey => {
          setState({ ...state, activeTab: activeKey });
        }}
      >
        <Tabs.TabPane
          key={(999999).toString()}
          tab={
            <div style={{ color: 'green' }}>
              <Icon type="plus" /> Add Milestone
            </div>
          }
          forceRender={true}
        >
          <Widget style={{ borderTopLeftRadius: 0 }}>
            <AddMilestone ref={childRefForm} visible={true} onCancel={handleModalCancel} onCreate={handleAddMilestone} meterType={props.meterType} />
          </Widget>
        </Tabs.TabPane>
        {state.milestones.map((item: ServiceIntervalMilestone, index: number) => (
          <Tabs.TabPane
            key={getKey(index, item)} // 0100I
            tab={item.meterValue ? `${item.meterValue} ${props.meterType} (${item.oneTime ? 'I' : 'R'})` : 'Adding New Milestone...'}
            forceRender={true}
            style={{ margin: 0 }}
          >
            <Widget style={{ borderTopLeftRadius: 0 }}>
              {/* <h1>{getKey(index, item)}</h1>
              <h2>{item.serviceItems && item.serviceItems.map(x => x.name)}</h2> */}
              <OneMilestone
                handleInputChange={(newItem: any) => handleServiceItemChange(newItem, index)}
                ref={refs.current[index]}
                // key={`ServiceIntervalMilestone|${getKey(index, item)}`}
                index={index}
                item={item}
                deleteMilestone={deleteMilestone}
                meterType={props.meterType}
                milestoneId={item.id ? item.id : index}
              />
            </Widget>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
});

export default Milestones;
