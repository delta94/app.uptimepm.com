import { Col, Form, Row, Badge, Typography, List, Skeleton } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React from 'react';
import { InspectionChecklistItem, useSaveChecklistItemNotesMutation, ChecklistItemTypeEnum } from 'generated';
import ListPhotos from 'components/ListPhotos';
import TextArea from 'antd/lib/input/TextArea';
import AddCheckList from './AddCheckList';
import './index.scss';
import Widget from 'components/Widget';
const FormItem = Form.Item;
const { Text } = Typography;

export interface IChecklistProps {
  form: WrappedFormUtils;
  inspectionId: string;
  checklist: InspectionChecklistItem[];
  isEdit: boolean;
}

export interface INotes {
  show: boolean;
  itemId: string;
}

export default (props: IChecklistProps) => {
  const { form } = props;
  const { getFieldDecorator } = form;
  const [saveNotes] = useSaveChecklistItemNotesMutation();
  const [state] = React.useState({
    notesList: [] as INotes[],
  });

  React.useEffect(() => {
    state.notesList = props.checklist.map(item => {
      const obj: INotes = {
        itemId: item.id!,
        show: item.notes && item.notes.length > 0 ? true : false,
      };
      return obj;
    });

    // eslint-disable-next-line
  }, [props.checklist]);

  const getStatus = (status: string): 'success' | 'processing' | 'default' | 'error' | 'warning' => {
    switch (status) {
      case 'Good':
        return 'success';
      case 'Bad':
        return 'error';
      case 'Needs Replacement':
        return 'warning';
      case 'Monitor':
        return 'processing';
      default:
        return 'default';
    }
  };

  // This has to be capital letter, required by hooks
  const OnBlurNote = async (notes: string, checklistItemId: string) => {
    if (notes && notes.length > 0) {
      await saveNotes({ variables: { data: { inspectionId: props.inspectionId, checklistItemId, notes } } });
    }
  };

  const getBadge = (item: InspectionChecklistItem) => {
    switch (item.type) {
      case ChecklistItemTypeEnum.Status:
        return <Badge status={getStatus(item.status ? item.status : 'default')} text={item.status} />;
      case ChecklistItemTypeEnum.NumericInput:
        return <Text type="secondary">Numeric Status: {item.numericStatus}</Text>;
      default:
        return '';
    }
  };

  // const showNotes = (e: any, item: InspectionChecklistItem, index: number) => {
  //   const foundItem = state.notesList.find(x => x.itemId === item.id!);
  //   if (foundItem) {
  //     foundItem.show = !foundItem.show ? true : false;
  //   }

  //   setState({ ...state, notesList: state.notesList });
  // };

  // const getNotesClass = (item: InspectionChecklistItem) => {
  //   const foundItem = state.notesList.find(x => x.itemId === item.id!);
  //   if (foundItem)
  //     if (foundItem.show) return 'show';
  //     else return 'hide';
  //   else return 'hide';
  // };

  return (
    <Widget>
      <List
        className="inspectionCheckList"
        size="small"
        dataSource={props.checklist}
        renderItem={(item: InspectionChecklistItem, index: number) => (
          <List.Item
            actions={[
              getBadge(item),
              // eslint-disable-next-line
              // <a key="list-notes" onClick={e => showNotes(e, item, index)}>
              //   <Icon type="form" />
              // </a>,
            ]}
          >
            {!props.isEdit && <AddCheckList form={props.form} index={index} item={item} />}

            <Skeleton title={false} loading={false} active>
              <List.Item.Meta
                title={item.title}
                description={
                  <>
                    {item.photos && item.photos.length > 0 && (
                      <Row type="flex" align="top" gutter={12}>
                        <Col xs={24} sm={24}>
                          <ListPhotos
                            defValue={item.photos ? item.photos : []}
                            photoList={item.photos ? item.photos : []}
                            fieldName={`checklist[${index}].photos`}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row type="flex" align="top" gutter={12}>
                      <Col xs={24} sm={24}>
                        <FormItem>
                          {getFieldDecorator(`checklist[${index}].notes`, {
                            initialValue: item.notes,
                            trigger: 'onBlur',
                            valuePropName: 'defaultValue',
                            rules: [{ required: false, message: 'Please insert notes!' }],
                          })(<TextArea onBlur={e => (props.isEdit ? OnBlurNote(e.target.value, item.id!) : null)} placeholder="Notes" rows={2} />)}
                        </FormItem>
                      </Col>
                    </Row>
                  </>
                }
              />
              <div></div>
            </Skeleton>
          </List.Item>
        )}
      />
    </Widget>
  );
};
