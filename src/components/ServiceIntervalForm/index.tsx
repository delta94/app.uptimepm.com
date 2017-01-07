import { Button, Col, Form, Input, Row } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent, useContext, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import GetServiceInterval from './GetServiceInterval';
import Widget from 'components/Widget';
import styles from './index.module.scss';
import {
  ServiceInterval,
  useSaveServiceIntervalMutation,
  useClientsForSelectionMutation,
  IdNameReference,
  useMakesForSelectMutation,
  useModelsForSelectMutation,
} from 'generated';
import { customStyles } from 'components/common/styles';
import { removeTypename } from 'helpers/utils';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import ReactSelect from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import { meterType } from 'components/EquipmentForm/data';
import Milestones from './Milestones/Milestones';

const FormItem = Form.Item;

export interface SaveServiceIntervalProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  serviceInterval?: ServiceInterval;
}

export const AddServiceInterval = (props: SaveServiceIntervalProps) => {
  const userContext = useContext(CurrentUserContext);
  const childRefMilestones = useRef<any>(null);
  const {
    form: { getFieldDecorator },
    location,
  } = props;
  const id = location.state ? location.state.id : undefined;
  const isEditMode = id ? true : false;
  const serviceInterval: ServiceInterval = props.serviceInterval || ({ permissions: [{ privileges: [] }] } as any);
  const [saveServiceInterval] = useSaveServiceIntervalMutation();
  const [findClients] = useClientsForSelectionMutation();
  const [findMakes] = useMakesForSelectMutation();
  const [findModels] = useModelsForSelectMutation();
  const [state, setState] = React.useState({
    meterType: isEditMode ? serviceInterval.meterType : '',
    selectedMilestones: serviceInterval.milestones,
    make: '',
    clientId: serviceInterval.client ? serviceInterval.client.id : userContext.user.client ? userContext.user.client!.id : '',
  });

  const cancel = () => {
    props.history.goBack();
  };

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;

    form.validateFields(async (err: any, values: any) => {
      const responseValidationMilestones = childRefMilestones.current!.initValidation();

      if (err || responseValidationMilestones.status) {
        // console.log(err);
        // console.log(responseValidationMilestones);
        return false;
      }
      values.milestones = removeTypename(responseValidationMilestones.milestones);
      values.client = values.client ? values.client.value : serviceInterval.client ? removeTypename(serviceInterval.client) : null;
      values.meterType = values.meterType.value;
      values.make = values.make.value;
      values.model = values.model.value;

      const result = await saveServiceInterval({ variables: { data: values } });

      if (result) {
        form.resetFields();
        // currentUserContext.client.cache.data.delete('ROOT_QUERY');
        props.history.goBack();
      } else {
        // console.log(result);
      }
    });
  };

  const clientSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    const result = await findClients({
      variables: { searchText: newValue },
    }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.clientsForSelection.map(c => ({
        value: removeTypename(c),
        label: c.name,
      }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      <Col>
        <Button type="primary" htmlType="submit">
          Save Service Interval
        </Button>
      </Col>
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );

  const makeSearch = async (newValue: any): Promise<{ value: string; label: string }[] | null> => {
    const result = await findMakes({
      variables: { searchText: newValue },
    }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.makesForSelect.map(c => ({
        value: c,
        label: c,
      }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const modelSearch = async (newValue: any): Promise<{ value: string; label: string }[] | null> => {
    const result = await findModels({
      variables: { searchText: newValue, make: state.make },
    }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.modelsForSelect.map(c => ({
        value: c,
        label: c,
      }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <ContainerHeader
        title={`${isEditMode ? 'Edit' : 'Add New'} Service Interval`}
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={actionButtons}
      />
      <Widget>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={11}>
            <h3>General Information</h3>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24}>
            {getFieldDecorator('id', {
              initialValue: serviceInterval.id,
            })(<Input placeholder="id" type="hidden" />)}
            <FormItem label="Title">
              {getFieldDecorator('title', {
                initialValue: serviceInterval.title,
                rules: [
                  {
                    required: true,
                    message: 'Please enter service interval title!',
                  },
                ],
              })(<Input placeholder="Service Interval Title" />)}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={userContext.corporateUser() ? 6 : 8}>
            <FormItem label="Make">
              {getFieldDecorator('make', {
                initialValue: serviceInterval.make
                  ? {
                      value: removeTypename(serviceInterval.make),
                      label: serviceInterval.make,
                    }
                  : null,
                rules: [
                  {
                    required: true,
                    message: 'Make is Required',
                  },
                ],
              })(
                <AsyncCreatableSelect
                  styles={customStyles}
                  noOptionsMessage={input => `Start Typing...`}
                  placeholder="Make..."
                  onChange={(input: any) => setState({ ...state, make: input ? input.value : '' })}
                  loadOptions={makeSearch}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={userContext.corporateUser() ? 6 : 8}>
            <FormItem label="Model">
              {getFieldDecorator('model', {
                initialValue: serviceInterval.model
                  ? {
                      value: removeTypename(serviceInterval.model),
                      label: serviceInterval.model,
                    }
                  : null,
                rules: [
                  {
                    required: true,
                    message: 'Model is Required',
                  },
                ],
              })(<AsyncCreatableSelect styles={customStyles} noOptionsMessage={input => `Start Typing...`} placeholder="Model..." loadOptions={modelSearch} />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={userContext.corporateUser() ? 6 : 8}>
            <FormItem label="Meter Type">
              {getFieldDecorator('meterType', {
                initialValue: serviceInterval.meterType
                  ? {
                      value: removeTypename(serviceInterval.meterType),
                      label: serviceInterval.meterType,
                    }
                  : null,
                rules: [
                  {
                    required: true,
                    message: 'Meter Type is Required',
                  },
                ],
              })(<ReactSelect options={meterType} onChange={(input: any) => setState({ ...state, meterType: input.value })} styles={customStyles} />)}
            </FormItem>
          </Col>
          {userContext.corporateUser() && (
            <Col xs={24} sm={6}>
              <FormItem label="Client">
                {getFieldDecorator('client', {
                  initialValue: serviceInterval.client
                    ? {
                        value: removeTypename(serviceInterval.client),
                        label: serviceInterval.client.name,
                      }
                    : null,
                  rules: [
                    {
                      required: true,
                      message: 'Client is Required',
                    },
                  ],
                })(<AsyncSelect styles={customStyles} noOptionsMessage={input => `Start Typing...`} placeholder="Client..." loadOptions={clientSearch} />)}
              </FormItem>
            </Col>
          )}
        </Row>
      </Widget>
      <Milestones
        milestones={isEditMode && serviceInterval.milestones ? serviceInterval.milestones : []}
        ref={childRefMilestones}
        meterType={state.meterType}
      />
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.actionButtons}>{actionButtons}</div>
        </Col>
      </Row>
    </Form>
  );
};
export default Form.create()(GetServiceInterval(AddServiceInterval));
