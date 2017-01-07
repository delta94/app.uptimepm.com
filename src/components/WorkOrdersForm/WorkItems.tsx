import React from 'react';
import { WorkOrderWorkItem, WorkOrderHistoryItem } from 'generated';
import { Row, Col } from 'antd';
import Widget from 'components/Widget';
import ListPhotos from 'components/ListPhotos';
import WorkItemsHistoryItem from './WorkItemsHistoryItem';
interface IProps {
  workItems: WorkOrderWorkItem[];
}

const WorkItems = (props: IProps) => {
  // This has to be capital letter, required by hooks
  // const OnBlurNote = async (notes: string, checklistItemId: string) => {
  //   if (notes && notes.length > 0) {
  //     console.log(notes);
  //     // await saveNotes({ variables: { data: { inspectionId: props.inspectionId, checklistItemId, notes } } });
  //   }
  // };

  // const getBadge = (item: WorkOrderWorkItem) => {
  //   return item.completed ? <Badge status="success" text="Completed" /> : <Badge status="error" text="Not completed" />;
  // };

  return (
    <>
      {props.workItems.map((item, index) => (
        <Widget key={index}>
          <h3>{item.title}</h3>
          {item.history.map((workOrderHistoryItem: WorkOrderHistoryItem, historyIndex: number) => {
            return <WorkItemsHistoryItem key={'workOrderHistoryItem' + historyIndex} item={workOrderHistoryItem} />;
          })}
          {item.photos && item.photos.length > 0 && (
            <Row type="flex" align="top" gutter={12}>
              <Col xs={24} sm={24}>
                <ListPhotos defValue={item.photos ? item.photos : []} photoList={item.photos ? item.photos : []} fieldName={`workItems[${index}].photos`} />
              </Col>
            </Row>
          )}
          {/* <Row type="flex" align="top" gutter={12}>
            <Col xs={24} sm={24}>
              <FormItem>
                <TextArea onBlur={e => OnBlurNote(e.target.value, item.id!)} placeholder="Notes" rows={2} />
              </FormItem>
            </Col>
          </Row> */}
        </Widget>
      ))}
    </>
  );
};
export default WorkItems;
