import React, { FormEvent, useContext, useRef, useState } from 'react';
import { Form, Input, Row, Col, InputNumber } from 'antd';
import { RouteComponentProps } from 'react-router';
import ReactSelect from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';

import { WrappedFormUtils } from 'antd/lib/form/Form';
import GetEquipment from './GetEquipment';
import Widget from 'components/Widget';
import ContainerHeader from 'components/ContainerHeader';
import ActionButtons from 'components/Forms/ActionButtons';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import {
  Equipment,
  useSaveEquipmentMutation,
  EquipmentInput,
  useUsersForSelectionQuery,
  useDealersForSelectionQuery,
  ExpectedUsage,
  UserReference,
  RoleTypeEnum,
  useDistinctClassificationsMutation,
  useMakesForSelectMutation,
  useModelsForSelectMutation,
  useClientsForSelectionMutation,
  useInspectionTemplatesForSelectMutation,
  useFindServiceIntervalsMutation,
  IdNameReference,
  JobReference,
  useFindOfficeLocationsForSelectMutation,
  useFindJobsForSelectMutation,
} from 'generated';
import { customStyles } from 'components/common/styles';
import { equipmentType, meterType } from './data';
import { removeTypename } from 'helpers/utils';
import EquipmentUsage from './EquipmentUsage';
import './index.scss';
import SearchBox from './SearchBox';
import DealerBox from './DealerBox';
import { allowed } from 'components/Routes/Access';

const FormItem = Form.Item;

export interface SaveEquipmentProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  equipment?: EquipmentInput;
}

export const FormEquipment = (props: SaveEquipmentProps) => {
  const currentUserContext = useContext(CurrentUserContext);
  const equipment: Equipment = props.equipment || ({ permissions: [{ privileges: [] }] } as any);
  const { getFieldDecorator } = props.form;
  const isEditMode = props.equipment && props.equipment.id ? true : false;
  const [state, setState] = useState({
    userSearchText: '',
    dealerSearch: '',
    meterType: isEditMode ? equipment.meterType : '',
    expectedUsage: isEditMode ? equipment.expectedUsage : null,
    selectedMake: isEditMode && equipment.make ? equipment.make : '',
    selectedOperators: isEditMode && equipment.operators ? equipment.operators : [],
    selectedMechanics: isEditMode && equipment.mechanics ? equipment.mechanics : [],
    selectedDealers: isEditMode && equipment.dealers ? equipment.dealers : [],
    showMeterEdit: false,
    meterValue: equipment.meterValue ? equipment.meterValue : 0,
    make: '',
    clientId: equipment.client ? equipment.client.id : currentUserContext.user.client ? currentUserContext.user.client!.id : '',
    classification: equipment.classification,
  });

  const [findClassifications] = useDistinctClassificationsMutation();
  const [findMakes] = useMakesForSelectMutation();
  const [findModels] = useModelsForSelectMutation();
  const [findClients] = useClientsForSelectionMutation();
  const [saveEquipment] = useSaveEquipmentMutation();
  const [findInspectionTemplates] = useInspectionTemplatesForSelectMutation();
  const [findServiceIntervals] = useFindServiceIntervalsMutation();
  const [findOfficeLocations] = useFindOfficeLocationsForSelectMutation();
  const [findJobs] = useFindJobsForSelectMutation();

  const { loading: dealerLoading, data: resDealer } = useDealersForSelectionQuery({
    fetchPolicy: 'network-only',
    variables: { skip: 0, pageSize: 100, searchText: state.dealerSearch },
  });
  const { loading: loadingUsers, data: resUsers } = useUsersForSelectionQuery({
    fetchPolicy: 'network-only',
    variables: { skip: 0, pageSize: 100, searchText: state.userSearchText },
  });

  const cancel = () => {
    props.history.goBack();
  };

  const childRef = useRef<any>(null);

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    setState({ ...state, userSearchText: '' }); // clear search in users

    const form = props.form;

    form.validateFields(async (err: any, values: any) => {
      const errorsEquipmentUsage = childRef.current!.initValidation();

      // console.log('Equipment', values);
      if (err || errorsEquipmentUsage) {
        return false;
      }
      values.expectedUsage = removeTypename(state.expectedUsage);
      values.operators = removeTypename(state.selectedOperators);
      values.mechanics = removeTypename(state.selectedMechanics);
      values.dealers = removeTypename(state.selectedDealers);
      // values.meterValue = state.meterValue;
      // values.make = removeTypename(state.selectedMake);
      // console.log('values.model', values.model);

      values.client = values.client ? values.client.value : equipment.client ? removeTypename(equipment.client) : null;
      values.model = values.model ? values.model.value : '';
      values.job = values.job ? values.job.value : null;

      values.type = values.type.value;
      values.meterType = values.meterType.value;
      values.make = values.make.value;
      values.classification = values.classification.value;
      values.name = values.nickname;
      values.inspectionTemplate = values.inspectionTemplate ? values.inspectionTemplate.value : null;
      values.serviceInterval = values.serviceInterval ? values.serviceInterval.value : null;
      values.officeLocation = values.officeLocation ? values.officeLocation.value : null;
      values.meterValue = Number(values.meterValue);

      // values.inspectionTemplate = removeTypename(
      //   resInspectionTemplates!.inspectionTemplates.inspectionTemplates.find(c => c.id === values.inspectionTemplateId)
      // );
      // values.serviceInterval = removeTypename(resServiceInterval!.serviceIntervals.serviceIntervals.find(c => c.id === values.serviceIntervalId));

      const result = await saveEquipment({ variables: { data: values } });

      if (result) {
        form.resetFields();
        currentUserContext.client.cache.data.delete('ROOT_QUERY'); // Clearing from apollo cache => refresh the table with new values
        props.history.goBack();
      } else {
        console.log(result);
      }
    });
  };

  const handleOperatorSearch = (s: string) => {
    // console.log('searching=', s);
    setState({ ...state, userSearchText: s });
  };

  const handleOperatorChange = (selectedOperators: any) => {
    setState({ ...state, selectedOperators: selectedOperators });
    // console.log('selectedOperators', selectedOperators);
  };

  const handleMechanicSearch = (s: string) => {
    setState({ ...state, userSearchText: s });
  };

  const handleMechanicChange = (selectedMechanics: any) => {
    setState({ ...state, selectedMechanics: selectedMechanics });
  };

  const handleEquipmentUsageChange = (newExpectedUsage: ExpectedUsage) => {
    if (props.equipment) {
      // console.log('Equipment change');
      setState({
        ...state,
        expectedUsage: newExpectedUsage,
      });
    }
  };

  const handleDealerSearch = (s: string) => {
    setState({ ...state, dealerSearch: s });
  };

  const handleDealerChange = (s: any) => {
    setState({ ...state, selectedDealers: s });
  };

  const classificationSearch = async (newValue: any): Promise<{ value: string; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findClassifications({ variables: { classification: newValue } }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.distinctClassifications.map(c => ({ value: c, label: c }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const makeSearch = async (newValue: any): Promise<{ value: string; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findMakes({ variables: { searchText: newValue } }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.makesForSelect.map(c => ({ value: c, label: c }));
      console.log('options', options);
      return options;
    }
    return null;
  };

  const officeLocationSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findOfficeLocations({ variables: { searchText: newValue, clientId: state.clientId ? state.clientId! : '' } }).catch(ex =>
      console.log('ex.message', ex.message)
    );
    if (result && result.data) {
      const options = result.data.findOfficeLocationsForSelect.map(c => ({ value: removeTypename(c), label: c.name }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const jobSearch = async (newValue: any): Promise<{ value: JobReference; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findJobs({ variables: { searchText: newValue, clientId: state.clientId ? state.clientId! : '' } }).catch(ex =>
      console.log('ex.message', ex.message)
    );
    if (result && result.data) {
      const options = result.data.findJobsForSelect.map(c => ({ value: removeTypename(c), label: c.name }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const modelSearch = async (newValue: any): Promise<{ value: string; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findModels({ variables: { searchText: newValue, make: state.make } }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.modelsForSelect.map(c => ({ value: c, label: c }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const clientSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findClients({ variables: { searchText: newValue } }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.clientsForSelection.map(c => ({ value: removeTypename(c), label: c.name }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const inspectionTemplateSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findInspectionTemplates({
      variables: { searchText: newValue, clientId: state.clientId ? state.clientId! : '', classification: state.classification ? state.classification : '' },
    }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.inspectionTemplatesForSelect.map(c => ({ value: removeTypename(c), label: c.title }));
      console.log('options', options);
      return options;
    }
    return null;
  };

  const serviceIntervalSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    // console.group('Value Changed');
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();

    const result = await findServiceIntervals({
      variables: { searchText: newValue, clientId: state.clientId ? state.clientId : currentUserContext.user.client!.id },
    }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.findServiceIntervals.map(si => ({ value: removeTypename(si), label: si.title }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  return (
    <Form layout="vertical" onSubmit={handleSubmit} className="equipment-form">
      <ContainerHeader
        title={isEditMode ? 'Equipment: ' + equipment.name : 'Equipment'}
        subheading="Detail view of Equipment"
        icon="pe-7s-display1 icon-gradient bg-premium-dark"
        actions={<ActionButtons onCancel={cancel} submitText="Save Equipment" />}
      />
      <Widget>
        <Row>
          <Col>
            <h3>General Information</h3>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={18}>
            {getFieldDecorator('id', {
              initialValue: equipment.id,
            })(<Input placeholder="id" type="hidden" />)}
            <FormItem label="Name/Nickname (Must Be Unique)">
              {getFieldDecorator('nickname', {
                initialValue: equipment.nickname,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [
                  {
                    required: true,
                    message: 'Please input Nickname',
                  },
                ],
              })(<Input placeholder="Nickname" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Vin or Serial">
              {getFieldDecorator('vinOrSerial', {
                initialValue: equipment.vinOrSerial,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [
                  {
                    required: true,
                    message: 'Please Enter VIN or Serial',
                  },
                ],
              })(<Input placeholder="VIN or Serial" />)}
            </FormItem>
          </Col>
          {/*
          <Col xs={24} sm={3}>
            <FormItem label="Date in Service">
              {getFieldDecorator('dateInService', {
                initialValue: isEditMode && equipment.dateInService ? moment(equipment.dateInService) : null,
                rules: [
                  {
                    type: 'object',
                    required: false,
                    message: 'Please select a date!',
                  },
                ],
              })(<DatePicker placeholder="Date in service" style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col> */}
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={6}>
            <FormItem label="Year">
              {getFieldDecorator('year', {
                initialValue: equipment.year,
                rules: [
                  {
                    required: false,
                    message: 'Please enter the year',
                  },
                ],
              })(<InputNumber style={{ width: '100%' }} min={1950} max={2500} placeholder="Year" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Equipment Type">
              {getFieldDecorator('type', {
                initialValue: equipment.type ? { value: removeTypename(equipment.type), label: equipment.type } : null,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              })(<ReactSelect options={equipmentType} styles={customStyles} />)}
            </FormItem>
          </Col>

          <Col xs={24} sm={6}>
            <FormItem label="Meter Type">
              {getFieldDecorator('meterType', {
                initialValue: equipment.meterType ? { value: removeTypename(equipment.meterType), label: equipment.meterType } : null,
                rules: [
                  {
                    required: true,
                    message: 'Meter Type is Required',
                  },
                ],
              })(
                <ReactSelect
                  options={meterType}
                  onChange={(input: any) => setState({ ...state, meterType: input ? input.value : null })}
                  styles={customStyles}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Meter Value">
              {getFieldDecorator('meterValue', {
                initialValue: equipment.meterValue,
                trigger: 'onBlur',
                valuePropName: 'defaultValue',
                rules: [
                  {
                    required: true,
                    message: 'Meter Value Required',
                  },
                ],
              })(<InputNumber style={{ width: '100%' }} placeholder="Meter Value" />)}
            </FormItem>
          </Col>
        </Row>

        <Row type="flex" gutter={10}>
          <Col xs={24} sm={6}>
            <FormItem label="Make">
              {getFieldDecorator('make', {
                initialValue: equipment.make ? { value: removeTypename(equipment.make), label: equipment.make } : null,
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

          <Col xs={24} sm={6}>
            <FormItem label="Model">
              {getFieldDecorator('model', {
                initialValue: equipment.model ? { value: equipment.model, label: equipment.model } : null,
              })(<AsyncCreatableSelect styles={customStyles} noOptionsMessage={input => `Start Typing...`} placeholder="Model..." loadOptions={modelSearch} />)}
            </FormItem>
          </Col>

          <Col xs={24} sm={6}>
            <FormItem label="Classification">
              {getFieldDecorator('classification', {
                initialValue: equipment.classification ? { value: equipment.classification, label: equipment.classification } : null,
                rules: [
                  {
                    required: true,
                    message: 'Classification is Required',
                  },
                ],
              })(
                <AsyncCreatableSelect
                  styles={customStyles}
                  noOptionsMessage={input => `Start Typing...`}
                  isClearable
                  placeholder="Classification..."
                  onChange={(value: any) => setState({ ...state, classification: value ? value.value : '' })}
                  loadOptions={classificationSearch}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Attachment">
              {getFieldDecorator('attachment', {
                initialValue: equipment.attachment,
                rules: [
                  {
                    required: false,
                    message: 'Please Enter Current Attachment',
                  },
                ],
              })(<Input style={{ width: '100%' }} placeholder="Attachment" />)}
            </FormItem>
          </Col>
          {allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Corporate, undefined, undefined) && (
            <Col xs={24}>
              <FormItem label="Client">
                {getFieldDecorator('client', {
                  initialValue: equipment.client ? { value: removeTypename(equipment.client), label: equipment.client.name } : null,
                  rules: [
                    {
                      required: true,
                      message: 'Client is Required',
                    },
                  ],
                })(
                  <AsyncSelect
                    styles={customStyles}
                    noOptionsMessage={input => `Start Typing...`}
                    placeholder="Client..."
                    onChange={(client: any) => setState({ ...state, clientId: client ? client.value.id : null })}
                    loadOptions={clientSearch}
                  />
                )}
              </FormItem>
            </Col>
          )}
        </Row>
      </Widget>
      <Widget>
        <EquipmentUsage
          key="EquipmentUsage"
          meterType={state.meterType}
          onChange={handleEquipmentUsageChange}
          expectedUsage={equipment.expectedUsage ? equipment.expectedUsage : ({} as ExpectedUsage)}
          ref={childRef}
        />
      </Widget>
      <Row type="flex" gutter={15}>
        <Col xs={24} sm={12}>
          <Widget>
            <Row>
              <Col>
                <h3>Inspection Templates</h3>
              </Col>
            </Row>
            <Row type="flex" gutter={10}>
              <Col xs={24}>
                <FormItem label="Inspection Template">
                  {getFieldDecorator('inspectionTemplate', {
                    initialValue: equipment.inspectionTemplate
                      ? { value: removeTypename(equipment.inspectionTemplate), label: equipment.inspectionTemplate.title }
                      : null,
                    rules: [
                      {
                        required: false,
                        message: 'Inspection Template is Required',
                      },
                    ],
                  })(
                    <AsyncSelect
                      isDisabled={!state.clientId || !state.classification}
                      styles={customStyles}
                      noOptionsMessage={() => `Start Typing...`}
                      placeholder="Inspection Template..."
                      loadOptions={inspectionTemplateSearch}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Widget>
        </Col>
        <Col xs={24} sm={12}>
          <Widget>
            <Row>
              <Col>
                <h3>Service Intervals</h3>
              </Col>
            </Row>
            <Row type="flex" gutter={10}>
              <Col xs={24}>
                <FormItem label="Service Interval">
                  {getFieldDecorator('serviceInterval', {
                    initialValue: equipment.serviceInterval
                      ? { value: removeTypename(equipment.serviceInterval), label: equipment.serviceInterval.title }
                      : null,
                    rules: [
                      {
                        required: false,
                        message: 'Service Interval is Required',
                      },
                    ],
                  })(
                    <AsyncSelect
                      isDisabled={!state.clientId}
                      styles={customStyles}
                      noOptionsMessage={() => `Start Typing...`}
                      placeholder="Service Interval..."
                      loadOptions={serviceIntervalSearch}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row type="flex" gutter={15}>
        <Col xs={24} sm={12}>
          <Widget>
            <Row>
              <Col>
                <h3>Office Location</h3>
              </Col>
            </Row>
            <Row type="flex" gutter={10}>
              <Col xs={24}>
                <FormItem label="Office Location">
                  {getFieldDecorator('officeLocation', {
                    initialValue: equipment.officeLocation ? { value: removeTypename(equipment.officeLocation), label: equipment.officeLocation.name } : null,
                    rules: [
                      {
                        required: true,
                        message: 'Office Location is Required',
                      },
                    ],
                  })(
                    <AsyncSelect
                      isDisabled={!state.clientId}
                      styles={customStyles}
                      noOptionsMessage={() => `Start Typing...`}
                      placeholder="Office Location..."
                      loadOptions={officeLocationSearch}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Widget>
        </Col>
        <Col xs={24} sm={12}>
          <Widget>
            <Row>
              <Col>
                <h3>Job</h3>
              </Col>
            </Row>
            <Row type="flex" gutter={10}>
              <Col xs={24}>
                <FormItem label="Job">
                  {getFieldDecorator('job', {
                    initialValue: equipment.job ? { value: removeTypename(equipment.job), label: `${equipment.job.name} : ${equipment.job.jobNumber}` } : null,
                    rules: [
                      {
                        required: false,
                        message: 'Job is Required',
                      },
                    ],
                  })(
                    <AsyncSelect
                      isDisabled={!state.clientId}
                      styles={customStyles}
                      noOptionsMessage={() => `Search Jobs...`}
                      placeholder="Search Jobs..."
                      loadOptions={jobSearch}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row type="flex" gutter={15}>
        <Col xs={24} sm={12} style={{ display: 'flex', flex: 1 }}>
          <Widget style={{ flex: 1 }}>
            <Row>
              <Col>
                <h3>Dealers</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <DealerBox
                  data={resDealer && resDealer.dealersSearch ? (resDealer.dealersSearch.dealers as IdNameReference[]) : []}
                  handleSearch={handleDealerSearch}
                  handleChange={handleDealerChange}
                  loading={dealerLoading}
                  defValue={equipment.dealers ? equipment.dealers : []}
                  placeholder="Search Dealers..."
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row type="flex" gutter={15}>
        <Col xs={24} sm={12} style={{ display: 'flex', flex: 1 }}>
          <Widget style={{ flex: 1 }}>
            <Row>
              <Col>
                <h3>Operators</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <SearchBox
                  data={resUsers && resUsers.users ? (resUsers.users.users as UserReference[]) : []}
                  handleSearch={handleOperatorSearch}
                  handleChange={handleOperatorChange}
                  loading={loadingUsers}
                  defValue={isEditMode ? equipment.operators! : []}
                  placeholder="Search Operators..."
                />
              </Col>
            </Row>
          </Widget>
        </Col>
        <Col xs={24} sm={12} style={{ display: 'flex', flex: 1 }}>
          <Widget style={{ flex: 1 }}>
            <Row>
              <Col>
                <h3>Mechanics</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <SearchBox
                  data={resUsers && resUsers.users ? (resUsers.users.users as UserReference[]) : []}
                  handleSearch={handleMechanicSearch}
                  handleChange={handleMechanicChange}
                  loading={loadingUsers}
                  defValue={isEditMode ? equipment.mechanics! : []}
                  placeholder="Search Mechanics..."
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      {/* <Widget>
        <Row>
          <Col>
            <h3>Other Information</h3>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          {allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Corporate, undefined, undefined) && (
            <Col xs={24} sm={12}>
              <SingleDropdown
                label="Client"
                fieldName="clientId"
                form={props.form}
                placeholder="Clients"
                names={['name']}
                defValue={isEditMode ? equipment.client : null}
                data={resClients && resClients.clients ? resClients.clients.clients : []}
              />
            </Col>
          )}

          <Col xs={24} sm={12}>
            <FormItem label="Date out of Service">
              {getFieldDecorator('dateOutOfService', {
                initialValue: isEditMode && equipment.dateOutOfService ? moment(equipment.dateOutOfService) : null,
                rules: [
                  {
                    type: 'object',
                    required: false,
                    message: 'Please select a date!',
                  },
                ],
              })(<DatePicker placeholder="Date out of service" style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
        </Row>
      </Widget> */}
      <Row>
        <Col xs={24} sm={24}>
          <FormItem>
            <ActionButtons onCancel={cancel} submitText="Save Equipment" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default Form.create()(GetEquipment(FormEquipment));
