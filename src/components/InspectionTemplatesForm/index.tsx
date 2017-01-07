import { Button, Col, Form, Input, Row, Select } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent, useRef, useContext } from 'react';
import { ExecutionResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import GetInspectionTemplate from './GetInspectionTemplate';
import Widget from 'components/Widget';
import styles from './index.module.scss';
import {
  InspectionTemplate,
  ChecklistItem,
  useSaveInspectionTemplateMutation,
  InspectionTemplateInput,
  ChecklistItemInput,
  SaveInspectionTemplateMutation,
  useClassificationsQuery
} from 'generated';
import { CheckList } from './CheckList';
import { removeTypename } from 'helpers/utils';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { SelectValue } from 'antd/lib/select';
import { ValidateStatuses } from 'components/SingleDropdown';
const FormItem = Form.Item;
const Option = Select.Option;

export interface SaveInspectionTemplateProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  inspectionTemplate?: InspectionTemplate;
}

interface ISaveInspectionTemplateResponse {
  saveInspectionTemplate: {
    id: string;
    title: string;
  };
}

export const AddInspection = (props: SaveInspectionTemplateProps) => {
  const currentUserContext = useContext(CurrentUserContext);
  const [saveInspectionTemplate] = useSaveInspectionTemplateMutation();
  const [state, setState] = React.useState({
    classification: {
      value: props.inspectionTemplate ? props.inspectionTemplate.classification : undefined,
      validateStatus: ValidateStatuses.None,
      errorMsg: ''
    }
  });
  const { loading, data: resClassifications } = useClassificationsQuery({ fetchPolicy: 'network-only' });

  const inspectionTemplate: InspectionTemplate = props.inspectionTemplate ? props.inspectionTemplate : ({ checklist: [] } as any);
  const { getFieldDecorator } = props.form;
  const isEditMode = props.inspectionTemplate ? true : false;
  let saveCheckList = inspectionTemplate.checklist as ChecklistItemInput[]; // will get filled with data from children

  const childRef = useRef<any>(null);

  // Main validate method that gets called from parent Save Button
  const validate = () => {
    const classValidation = valRequiredField(state.classification.value, 'Classification');

    setState({
      ...state,
      classification: {
        ...classValidation,
        value: state.classification.value
      }
    });

    let validationStatus = ValidateStatuses.Success;
    if (classValidation.validateStatus === ValidateStatuses.Error) {
      validationStatus = ValidateStatuses.Error;
    }

    return validationStatus;
  };

  const submitForm = (e: FormEvent<any>) => {
    e.preventDefault();

    const form = props.form;
    form.validateFieldsAndScroll(async (err: any, values: InspectionTemplateInput) => {
      const errorsFromChecklist = childRef.current!.initValidation();
      const classificationValidation = validate();
      if (err || errorsFromChecklist || classificationValidation !== ValidateStatuses.Success) {
        // console.log(err);
        // console.log(errorsFromChecklist);
        // console.log(classificationValidation);
        return false;
      }

      let result: void | ExecutionResult<SaveInspectionTemplateMutation>;
      try {
        values.checklist = removeTypename(saveCheckList);
        values.classification = state.classification.value!;
        result = await saveInspectionTemplate({ variables: { data: values } });

        if (result && result.errors) {
          // console.log(err);
          return false;
        }

        if (result && result.data) {
          // console.log(result);
          form.resetFields();
          currentUserContext.client.cache.data.delete('ROOT_QUERY');
          props.history.goBack();
        }
      } catch (ex) {}
    });
  };

  const updateParent = (checklist: ChecklistItemInput[]) => {
    // console.log('Updating all data');
    saveCheckList = checklist;
  };

  const cancel = () => {
    props.history.goBack();
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      <Col>
        <Button type="primary" htmlType="submit">
          Save Inspection
        </Button>
      </Col>
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );

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

  const handleClassificationChange = (e: any) => {
    setState({
      ...state,
      classification: {
        ...valRequiredField(e, 'Classification'),
        value: e
      }
    });
  };

  // console.log('Parent RENDERING!');

  return (
    <Form layout="vertical" onSubmit={submitForm}>
      <ContainerHeader title={`${isEditMode ? 'Edit' : 'Add New'} Inspection Template`} icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
      <Widget>
        <h3>General Information</h3>
        <Row gutter={12} type="flex">
          <Col xs={24} sm={6}>
            <FormItem style={{ height: 0, padding: 0, margin: 0 }}>
              {getFieldDecorator('id', {
                initialValue: inspectionTemplate.id
              })(<Input placeholder="id" type="hidden" />)}
            </FormItem>

            <FormItem label="Title">
              {getFieldDecorator('title', {
                initialValue: inspectionTemplate.title,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: true, message: 'Please enter inspection title!' }]
              })(<Input placeholder="Inspection Title" />)}
            </FormItem>
          </Col>

          <Col xs={24} sm={6}>
            <FormItem label="Equipment Type">
              {getFieldDecorator('equipmentType', {
                initialValue: inspectionTemplate.equipmentType,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [{ required: true, message: 'Please select an equipment type!' }]
              })(
                <Select placeholder="Please select a type">
                  <Option value="Tracked">Tracked</Option>
                  <Option value="Wheeled">Wheeled</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          {!loading && resClassifications && resClassifications.classifications && (
            <>
              <Col xs={24} sm={6}>
                <FormItem label="Classification" validateStatus={state.classification.validateStatus} help={state.classification.errorMsg}>
                  <Select
                    allowClear={true}
                    mode="combobox"
                    value={state.classification.value ? state.classification.value : ''}
                    placeholder="Please select classification"
                    onChange={(event: SelectValue) => handleClassificationChange(event)}
                  >
                    {resClassifications.classifications.classifications.map((item: any) => {
                      return <Option key={item.name}>{item.name}</Option>;
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col xs={24} sm={6}>
                <FormItem label="Attachment">
                  {getFieldDecorator('attachment', {
                    initialValue: inspectionTemplate.attachment,
                    trigger: 'onBlur',
                    valuePropName: 'defaultValue'
                  })(<Input placeholder="Equipment Attachment" />)}
                </FormItem>
              </Col>
            </>
          )}
        </Row>
      </Widget>

      <CheckList
        inspectionId={inspectionTemplate.id!}
        isEdit={isEditMode}
        form={props.form}
        checklist={isEditMode ? inspectionTemplate.checklist : [{ consumable: false, photoRequired: false } as ChecklistItem]}
        updateIndex={updateParent}
        ref={childRef}
      />

      <Row>
        <div className={styles.actionButtons}>{actionButtons}</div>
      </Row>
    </Form>
  );
};
export default Form.create()(GetInspectionTemplate(AddInspection));
