import { Button, Col, Form, Input, Row, Select, Icon, Checkbox, Radio, message } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import { SelectValue } from 'antd/lib/select';
import { ChecklistItemStatus, ChecklistItem, ChecklistItemTypeEnum, Fluid } from 'generated';
import styles from './index.module.scss';

import Widget from 'components/Widget';
import { Draggable } from 'react-beautiful-dnd';
const FormItem = Form.Item;
const Option = Select.Option;
export enum ValidateStatuses {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Validating = 'validating',
  None = ''
}

export interface IChecklistProps {
  item: ChecklistItem;
  index: number;
  isEdit: boolean;
  deleteCheckListItem: any;
  updateCheckList: any;
  resFluids: Fluid[];
}

const areEqual = (prevProps: IChecklistProps, nextProps: IChecklistProps) => {
  return prevProps.item.title === nextProps.item.title;
};

export const CheckListItemFunc = forwardRef((props: IChecklistProps, ref: any) => {
  const defaultStatuses = [
    { text: 'Good', shouldSendAlert: false, isDefault: true },
    { text: 'Monitor', shouldSendAlert: false, isDefault: false },
    { text: 'Needs Replacement', shouldSendAlert: true, isDefault: false }
  ];

  const { item, index } = props;

  const addValStatus = (x: ChecklistItemStatus) => {
    return {
      value: x.text,
      text: x.text,
      validateStatus: ValidateStatuses.None,
      errorMsg: '',
      shouldSendAlert: x.shouldSendAlert,
      isDefault: x.isDefault ? x.isDefault : false
    };
  };

  // helper method to init val in statuses
  const addValidationsForStatuses = (statuses: ChecklistItemStatus[]) => {
    return statuses.map(x => addValStatus(x));
  };

  const [state, setState] = React.useState({
    id: { value: item.id, validateStatus: ValidateStatuses.None, errorMsg: '' },
    title: { value: item.title, validateStatus: ValidateStatuses.None, errorMsg: '' },
    type: { value: item.type, validateStatus: ValidateStatuses.None, errorMsg: '' },
    consumableFluid: { value: item.consumableFluid, validateStatus: ValidateStatuses.None, errorMsg: '' },
    statuses: addValidationsForStatuses(item.statuses ? item.statuses : defaultStatuses),
    item: item
  });

  React.useEffect(() => {
    // init state to props values on re-renders
    setState({
      id: { value: item.id, validateStatus: ValidateStatuses.None, errorMsg: '' },
      title: { value: item.title, validateStatus: ValidateStatuses.None, errorMsg: '' },
      type: { value: item.type, validateStatus: ValidateStatuses.None, errorMsg: '' },
      consumableFluid: { value: item.consumableFluid, validateStatus: ValidateStatuses.None, errorMsg: '' },
      statuses: addValidationsForStatuses(item.statuses ? item.statuses : defaultStatuses),
      item: item
    });
    // eslint-disable-next-line
  }, [props.item]);

  const valRequiredField = (value: any, fieldName: string) => {
    if (value) {
      return {
        validateStatus: ValidateStatuses.Success,
        errorMsg: ''
      };
    }
    return {
      validateStatus: ValidateStatuses.Error,
      errorMsg: fieldName + ' is a required field'
    };
  };

  // Main validate method that gets called from parent Save Button
  const validate = () => {
    const titleValObj = valRequiredField(state.title.value, 'Title');
    const typeValObj = valRequiredField(state.type.value, 'Type');

    let consumableFluidValObj = {
      validateStatus: ValidateStatuses.Success,
      errorMsg: ''
    };
    if (state.item.consumable) {
      consumableFluidValObj = valRequiredField(state.consumableFluid.value, 'ConsumableFluid');
    }

    state.statuses.forEach(status => {
      const statusValObj = valRequiredField(status.value, 'Input');
      status.errorMsg = statusValObj.errorMsg;
      status.validateStatus = statusValObj.validateStatus;
    });

    setState({
      ...state,
      title: {
        ...titleValObj,
        value: state.title.value
      },
      type: {
        ...typeValObj,
        value: state.type.value
      },
      consumableFluid: {
        ...consumableFluidValObj,
        value: state.consumableFluid.value
      },
      statuses: state.statuses
    });

    let validationStatus = ValidateStatuses.Success;
    if (titleValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (typeValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }
    if (consumableFluidValObj.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    return validationStatus;
  };

  // Gets called from parent
  useImperativeHandle(ref, () => ({
    validateChild() {
      return validate();
    }
  }));

  const handleInputChange = (evt: any) => {
    (state.item as any)[evt.target.name] = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: {
        ...valRequiredField(evt.target.value, evt.target.name),
        value: evt.target.value
      },
      item: state.item
    });

    // setState({ ...state, item: state.item });
    props.updateCheckList();
  };

  const handleSubInputChange = (evt: any, index: number, statusIndex: number) => {
    // console.log(evt.target.value);

    if (state.item.statuses) {
      state.item.statuses[statusIndex].text = evt.target.value;

      state.statuses[statusIndex] = {
        ...valRequiredField(evt.target.value, 'Input'),
        value: evt.target.value,
        text: evt.target.value,
        shouldSendAlert: state.item.statuses[statusIndex].shouldSendAlert,
        isDefault: state.item.statuses[statusIndex].isDefault ? (state.item.statuses[statusIndex].isDefault as boolean) : false
      };

      setState({ ...state, statuses: state.statuses, item: state.item });
      props.updateCheckList();
    }
  };

  const checkBoxChange = (evt: any) => {
    // console.log('checkBoxChange', evt.target.value);
    (state.item as any)[evt.target.name] = evt.target.checked;
    setState({ ...state, item: state.item });
    props.updateCheckList();
  };

  const checkBoxStatusChange = (evt: any, statusIndex: number) => {
    // console.log(evt.target);
    if (state.item.statuses) {
      state.item.statuses[statusIndex].shouldSendAlert = evt.target.checked;
      setState({ ...state, item: state.item });
      props.updateCheckList();
    }
  };

  const isDefaultStatusChange = (evt: any, statusIndex: number) => {
    // console.log(evt.target);
    if (state.item.statuses) {
      state.item.statuses.forEach(status => {
        status.isDefault = false; // clear all
      });

      state.item.statuses[statusIndex].isDefault = evt.target.checked; // set selected
      setState({ ...state, item: state.item });
      props.updateCheckList();
    }
  };

  const deleteCheckListItem = (index: number) => {
    props.deleteCheckListItem(index);
  };

  const calcStatuses = (item: any) => {
    const previousStatuses = state.item.statuses;

    if (previousStatuses && previousStatuses.length > 0) {
      item.statuses = previousStatuses;
    } else {
      item.statuses = defaultStatuses;
    }

    return item.statuses;
  };

  const handleTypeChange = (e: any, item: ChecklistItem, index: number) => {
    // console.log('e, index', e, index);
    if (e === 'Status') {
      if (index > 0) {
        item.statuses = calcStatuses(item);
      } else {
        // init for the first row only
        item.statuses = defaultStatuses;
      }
    } else {
      item.statuses = [];
    }

    state.item.type = ChecklistItemTypeEnum[e as ChecklistItemTypeEnum];
    if (item.statuses) state.statuses = addValidationsForStatuses(item.statuses);
    setState({
      ...state,
      type: {
        ...valRequiredField(e, 'Type'),
        value: e
      },
      item: state.item
    });

    props.updateCheckList();
  };

  const addStatus = (item: ChecklistItem, index: number) => {
    const emptyStatus = { shouldSendAlert: false, isDefault: false } as ChecklistItemStatus;
    item.statuses!.push(emptyStatus);

    state.statuses.push(addValStatus(emptyStatus));

    setState({ ...state, item });
    props.updateCheckList();
  };

  const deleteStatus = (item: any, index: number, statusIndex: number) => {
    if (state.statuses.length <= 1) {
      message.error('You must have at least one status.');
      return;
    }
    let deletedIsDefault = false;
    if (state.statuses[statusIndex].isDefault || item.statuses[statusIndex]) {
      deletedIsDefault = true;
    }
    item.statuses.splice(statusIndex, 1);
    state.statuses.splice(statusIndex, 1);

    if (deletedIsDefault) {
      if (item.statuses.length > 0) {
        item.statuses[0].isDefault = true;
      }
      if (state.statuses.length > 0) {
        state.statuses[0].isDefault = true;
      }
    }

    setState({ ...state, item });
    props.updateCheckList();
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    padding: 2,
    paddingBottom: '0px',
    // margin: `0 0 10px 0`,
    background: isDragging ? '#6c95d3' : '',
    borderRadius: '5px',

    // styles we need to apply on draggables
    ...draggableStyle
  });

  const handleFluidChange = (e: any, item: any, index: number) => {
    // console.log(e, item, index);
    item.consumableFluid = e;
    // if (e === 'Status') {
    //   if (index > 0) {
    //     item.statuses = calcStatuses(item);
    //   } else {
    //     // init for the first row only
    //     item.statuses = defaultStatuses;
    //   }
    // } else {
    //   item.statuses = [];
    // }

    // state.item.type = ChecklistItemTypeEnum[e as ChecklistItemTypeEnum];
    // if (item.statuses) state.statuses = addValidationsForStatuses(item.statuses);
    setState({
      ...state,
      consumableFluid: {
        ...valRequiredField(e, 'ConsumableFluid'),
        value: e
      },
      item: state.item
    });

    props.updateCheckList();
  };

  // console.log('CheckListItemFunc Rend props item=', state.item.title);
  return (
    <Draggable key={index} draggableId={index.toString()} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
          <Widget key={index}>
            <div className={styles.dragSpacer} />
            <div {...provided.dragHandleProps} className={styles.drag}>
              <div className={styles.title}>:: Item {index}</div>
            </div>
            <Row>
              <Col>
                <Row type="flex" justify="space-around" align="bottom" gutter={12}>
                  <Col xs={24} sm={18}>
                    <FormItem label="Title" validateStatus={state.title.validateStatus} help={state.title.errorMsg}>
                      <Input
                        addonBefore={index !== 0 ? <Icon type="delete" theme="filled" onClick={() => deleteCheckListItem(index)} /> : null}
                        value={state.title.value}
                        name="title"
                        onChange={e => handleInputChange(e)}
                        placeholder="Checklist Item Title"
                      />
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={6}>
                    <FormItem label="Type" validateStatus={state.type.validateStatus} help={state.type.errorMsg}>
                      <Select value={state.item.type} placeholder="Please select a type" onChange={(event: SelectValue) => handleTypeChange(event, item, index)}>
                        <Option value="TextInput">Text Input</Option>
                        <Option value="NumericInput">Number Input</Option>
                        <Option value="Status">Status</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row type="flex" justify="space-around" key={index} align="top" gutter={12}>
                  <Col xs={24} sm={8}>
                    <FormItem>
                      <Checkbox defaultChecked={item.consumable ? item.consumable : false} checked={state.item.consumable} name="consumable" onChange={e => checkBoxChange(e)}>
                        Consumable
                      </Checkbox>
                    </FormItem>
                    {item.consumable && (
                      <FormItem label="Fluid" validateStatus={state.consumableFluid.validateStatus} help={state.consumableFluid.errorMsg}>
                        <Select
                          allowClear={true}
                          mode="combobox"
                          value={state.item.consumableFluid ? state.item.consumableFluid : undefined}
                          placeholder="Please select fluid"
                          onChange={(event: SelectValue) => handleFluidChange(event, item, index)}
                        >
                          {props.resFluids.map((item: any) => {
                            return <Option key={item.name}>{item.name}</Option>;
                          })}
                        </Select>
                      </FormItem>
                    )}
                    <FormItem>
                      <Checkbox
                        checked={state.item.photoRequired}
                        name="photoRequired"
                        onChange={e => checkBoxChange(e)}
                        defaultChecked={item.photoRequired ? item.photoRequired : false}
                      >
                        Photo Required
                      </Checkbox>
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={16}>
                    {state.item.statuses && state.item.statuses.length > 0 ? (
                      <React.Fragment>
                        {state.item.statuses.map((status: ChecklistItemStatus, statusIndex: number) => (
                          <>
                            <Row key={statusIndex} gutter={10} type="flex" align="middle">
                              <Col xs={24} sm={16}>
                                <FormItem
                                  validateStatus={state.statuses ? state.statuses[statusIndex].validateStatus : ValidateStatuses.None}
                                  help={state.statuses ? state.statuses[statusIndex].errorMsg : ''}
                                >
                                  <Input
                                    value={state.statuses![statusIndex].value}
                                    onChange={e => handleSubInputChange(e, index, statusIndex)}
                                    addonBefore={<Icon type="delete" theme="filled" onClick={() => deleteStatus(item, index, statusIndex)} />}
                                    placeholder="Checklist Item"
                                  />
                                </FormItem>
                              </Col>
                              <Col xs={24} sm={8}>
                                <FormItem>
                                  <Checkbox
                                    checked={status.shouldSendAlert ? status.shouldSendAlert : false}
                                    onChange={e => checkBoxStatusChange(e, statusIndex)}
                                    defaultChecked={status.shouldSendAlert ? status.shouldSendAlert : false}
                                  >
                                    Should Send Alert
                                  </Checkbox>
                                  <Radio checked={status.isDefault ? status.isDefault : false} onChange={e => isDefaultStatusChange(e, statusIndex)}>
                                    Is Default
                                  </Radio>
                                </FormItem>
                              </Col>
                            </Row>
                          </>
                        ))}
                        <Row>
                          <Col>
                            <Button onClick={() => addStatus(item, index)}>Add Another Status</Button>
                          </Col>
                        </Row>
                      </React.Fragment>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Widget>
        </div>
      )}
    </Draggable>
  );
});

export default React.memo(CheckListItemFunc, areEqual);
