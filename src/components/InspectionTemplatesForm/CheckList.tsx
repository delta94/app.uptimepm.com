import { Button, Col, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { forwardRef, useImperativeHandle, useRef, createRef } from 'react';
import { ChecklistItem, useFluidSelectionQuery, Fluid } from 'generated';
import CheckListItemFunc, { ValidateStatuses } from './CheckListItemFunc';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import LoadingSpinner from 'components/LoadingSpinner';

export interface IChecklistProps {
  form: WrappedFormUtils;
  inspectionId: string;
  checklist: ChecklistItem[];
  isEdit: boolean;
  updateIndex: any;
}

export const CheckList = forwardRef((props: IChecklistProps, ref: any) => {
  const [state, setState] = React.useState({
    checklist: props.checklist
  });

  const { loading, data: resFluids, error } = useFluidSelectionQuery({ fetchPolicy: 'network-only' });

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
      for (let ii = 0; ii < state.checklist.length; ii++) {
        const childValidationStatus = refs.current[ii].current.validateChild();
        if (childValidationStatus === ValidateStatuses.Error) {
          returnValue = true;
        }
      }
      return returnValue;
    }
  }));

  const addChecklist = () => {
    state.checklist.push({ consumable: false, photoRequired: false } as ChecklistItem);
    setState({
      ...state,
      checklist: state.checklist
    });
  };

  const deleteCheckListItem = (startIndex: number) => {
    const checkListArr = state.checklist;
    if (startIndex !== -1) {
      // console.log('startIndex');
      // console.log(startIndex);
      checkListArr.splice(startIndex, 1);
      setState({
        ...state,
        checklist: checkListArr.length > 0 ? checkListArr : []
      });
    }
  };

  const reorder = (list: ChecklistItem[], startIndex: number, endIndex: number): ChecklistItem[] => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
    return list;
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    // console.log('Reordering result.source', result.source);
    setState({ ...state, checklist: reorder(state.checklist, result.source.index, result.destination.index) });
  };

  const grid = 0;

  const getListStyle = (isDraggingOver: any) => ({
    background: isDraggingOver ? '#deebff' : '',
    padding: grid,
    width: '100%'
  });

  const updateCheckList = () => {
    props.updateIndex(state.checklist);
  };

  // console.log('CheckList.tsx Updating parent checklist', state.checklist);
  props.updateIndex(state.checklist);

  if (loading) return <LoadingSpinner tip="Loading Your details..." />;
  if (error) return <div className="error">Error while fetching user details </div>;

  return (
    <>
      <Row>
        <Col>
          <h3>Checklist Items ({state.checklist.length})</h3>
        </Col>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {state.checklist.map((item: ChecklistItem, index: number) => (
                <CheckListItemFunc
                  updateCheckList={updateCheckList}
                  key={index}
                  item={item}
                  index={index}
                  isEdit={props.isEdit}
                  deleteCheckListItem={deleteCheckListItem}
                  ref={refs.current[index]}
                  resFluids={resFluids && resFluids.fluids ? resFluids.fluids.fluids : ([] as Fluid[])}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Row>
        <Col>
          <Button type="primary" onClick={addChecklist}>
            Add Another Checklist Item
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default CheckList;
