import { Button, Col, Form, Input, Row, DatePicker } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent, useContext, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import styles from './index.module.scss';
import EquipmentBox from './EquipmentBox';
import {
  useClientsForSelectionMutation,
  IdNameReference,
  Job,
  useSaveJobMutation,
  useFindOfficeLocationsForSelectMutation,
  UserReference,
  useFindUsersForSelectMutation,
  Address,
  DetailedEquipmentReference,
  useEquipmentForSelectQuery,
  useUsersWithOperatorsAndMechanicsQuery,
} from 'generated';
import { customStyles } from 'components/common/styles';
import { removeTypename } from 'helpers/utils';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import AsyncSelect from 'react-select/async';
import GetJob from './GetJob';
import SmartAddresses from 'components/SmartAddresses';
import SearchBox from 'components/EquipmentForm/SearchBox';
import moment from 'moment';

const FormItem = Form.Item;

export interface SaveJobProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  job?: Job;
}

export const JobForm = (props: SaveJobProps) => {
  const isCorporate = props.location.pathname.indexOf('corporate') !== -1;
  const job: Job = props.job || (({ permissions: [{ privileges: [] }] } as any) as Job);
  if (props.location.state && props.location.state.client && props.location.state.officeLocation) {
    job.client = props.location.state.client;
    job.officeLocation = props.location.state.officeLocation;
  }
  const childRef = useRef<any>(null);
  const userContext = useContext(CurrentUserContext);
  const {
    form: { getFieldDecorator },
    location,
  } = props;
  const id = location.state ? location.state.id : undefined;
  const isEdit = id ? true : false;
  const [saveServiceInterval] = useSaveJobMutation();
  const [findClients] = useClientsForSelectionMutation();
  const [findUsers] = useFindUsersForSelectMutation();
  const [findOfficeLocations] = useFindOfficeLocationsForSelectMutation();

  const [state, setState] = React.useState({
    clientId: job.client ? job.client.id : userContext.user.client ? userContext.user.client!.id : '',
    addresses: isEdit && job.addresses ? job.addresses : [{} as Address],
    equipmentSearchText: '',
    usersSearchText: '',
    selectedEquipment: isEdit && job.equipment ? job.equipment : [],
    selectedOperators: isEdit && job.operators ? job.operators : [],
    selectedMechanics: isEdit && job.mechanics ? job.mechanics : [],
    selectedNotificationUsers: isEdit && job.notificationUsers ? job.notificationUsers : [],
  });

  const { loading: loadingEquipment, data: resEquipment } = useEquipmentForSelectQuery({
    fetchPolicy: 'network-only',
    variables: { searchText: state.equipmentSearchText, clientId: state.clientId },
  });
  const { loading: loadingUsers, data: resUsers } = useUsersWithOperatorsAndMechanicsQuery({
    fetchPolicy: 'network-only',
    variables: { clientId: state.clientId, searchText: state.usersSearchText },
  });

  const cancel = () => {
    props.history.goBack();
  };

  const officeLocationSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    const result = await findOfficeLocations({ variables: { searchText: newValue, clientId: state.clientId ? state.clientId! : '' } }).catch(ex =>
      console.log('ex.message', ex.message)
    );
    if (result && result.data) {
      // console.log(result.data);

      const options = result.data.findOfficeLocationsForSelect.map(c => ({ value: removeTypename(c), label: c.name }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: any) => {
      const errorsFromAddresses = childRef.current!.initValidation();
      if (err || errorsFromAddresses.status) {
        // console.log(err);
        // console.log(errorsFromAddresses);
        return false;
      }
      values.client = values.client ? values.client.value : job.client ? removeTypename(job.client) : null;
      values.foreman = values.foreman ? values.foreman.value : job.foreman ? removeTypename(job.foreman) : null;
      values.addresses = removeTypename(errorsFromAddresses.addressList);
      values.equipment = removeTypename(state.selectedEquipment);
      values.operators = removeTypename(state.selectedOperators);
      values.mechanics = removeTypename(state.selectedMechanics);
      values.officeLocation = values.officeLocation ? values.officeLocation.value : null;
      values.notificationUsers = removeTypename(state.selectedNotificationUsers);

      const result = await saveServiceInterval({ variables: { data: values } });

      if (result) {
        form.resetFields();
        userContext.client.cache.data.delete('ROOT_QUERY');
        isCorporate ? props.history.push('/corporate/jobs') : props.history.push('/client/jobs');
        // props.history.goBack();
      } else {
        console.log(result);
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

  const onClientChange = (e: any) => {
    if (e.value && e.value.id) setState({ ...state, clientId: e.value.id });
  };

  const userSearch = async (newValue: any): Promise<{ value: UserReference; label: string }[] | null> => {
    const result = await findUsers({
      variables: { searchText: newValue, clientId: state.clientId },
    }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.findUsersForSelect.map(c => ({
        value: removeTypename(c),
        label: c.firstName + ' ' + c.lastName,
      }));
      // console.log('options', options);
      return options;
    }
    return null;
  };

  const handleEquipmentSearch = (s: string) => {
    setState({ ...state, equipmentSearchText: s });
  };

  const handleEquipmentChange = (s: any) => {
    setState({ ...state, selectedEquipment: s });
  };

  const handleOperatorChange = (selectedOperators: any) => {
    setState({ ...state, selectedOperators: selectedOperators });
    // console.log('selectedOperators', selectedOperators);
  };

  const handleMechanicChange = (selectedMechanics: any) => {
    setState({ ...state, selectedMechanics: selectedMechanics });
  };

  const handleUsersSearch = (s: string) => {
    console.log(s);
    setState({ ...state, usersSearchText: s });
  };

  const handleNotificationUsersChange = (selectedNotificationUsers: any) => {
    setState({ ...state, selectedNotificationUsers: selectedNotificationUsers });
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      <Col>
        <Button type="primary" htmlType="submit">
          Save Job
        </Button>
      </Col>
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );

  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <ContainerHeader title={`${isEdit ? 'Edit' : 'Add New'} Job`} icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
      <Widget>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={11}>
            <h3>General Information</h3>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24}>
            {getFieldDecorator('id', {
              initialValue: job.id,
            })(<Input placeholder="id" type="hidden" />)}
            <FormItem label="Name">
              {getFieldDecorator('name', {
                initialValue: job.name,
                rules: [
                  {
                    required: true,
                    message: 'Please enter Job name!',
                  },
                ],
              })(<Input placeholder="Job Name" />)}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" gutter={10}>
          <Col xs={24} sm={8}>
            <FormItem label="Job Number">
              {getFieldDecorator('jobNumber', {
                initialValue: job.jobNumber,
                rules: [
                  {
                    required: true,
                    message: 'Job number is Required',
                  },
                ],
              })(<Input className={styles.fullWidth} placeholder="Job Number" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Office Location">
              {getFieldDecorator('officeLocation', {
                initialValue: job.officeLocation
                  ? {
                      value: removeTypename(job.officeLocation),
                      label: job.officeLocation.name,
                    }
                  : null,
                rules: [
                  {
                    required: true,
                    message: 'Office Location is Required',
                  },
                ],
              })(
                <AsyncSelect
                  styles={customStyles}
                  noOptionsMessage={input => `Start Typing...`}
                  placeholder="Office Locations..."
                  loadOptions={officeLocationSearch}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={8}>
            <FormItem label="Foreman">
              {getFieldDecorator('foreman', {
                initialValue: job.foreman
                  ? {
                      value: removeTypename(job.foreman),
                      label: job.foreman.firstName + ' ' + job.foreman.lastName,
                    }
                  : null,
                rules: [
                  {
                    required: true,
                    message: 'Foreman is Required',
                  },
                ],
              })(<AsyncSelect styles={customStyles} noOptionsMessage={input => `Start Typing...`} placeholder="Foreman ..." loadOptions={userSearch} />)}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" gutter={15}>
          <Col xs={24} sm={12}>
            <FormItem label="Start Date">
              {getFieldDecorator('startDate', {
                initialValue: isEdit ? moment(job.startDate) : null,
                rules: [
                  {
                    type: 'object',
                    required: false,
                    message: 'Please select a date!',
                  },
                ],
              })(<DatePicker placeholder="Start date" style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={12}>
            <FormItem label="End Date">
              {getFieldDecorator('endDate', {
                initialValue: isEdit ? moment(job.endDate) : null,
                rules: [
                  {
                    type: 'object',
                    required: false,
                    message: 'Please select a date!',
                  },
                ],
              })(<DatePicker placeholder="End date" style={{ width: '100%' }} format="YYYY-MM-DD" />)}
            </FormItem>
          </Col>
        </Row>
        {userContext.corporateUser() && (
          <FormItem label="Client">
            {getFieldDecorator('client', {
              initialValue: job.client
                ? {
                    value: removeTypename(job.client),
                    label: job.client.name,
                  }
                : null,
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
                onChange={onClientChange}
                loadOptions={clientSearch}
              />
            )}
          </FormItem>
        )}
      </Widget>

      <Widget>
        <SmartAddresses ref={childRef} isRequired={true} isSingle={false} addresses={state.addresses} />
      </Widget>

      <Widget>
        <h3>Equipment</h3>
        <EquipmentBox
          data={resEquipment && resEquipment.equipmentForSelect ? resEquipment.equipmentForSelect : ([] as DetailedEquipmentReference[])}
          handleSearch={handleEquipmentSearch}
          handleChange={handleEquipmentChange}
          loading={loadingEquipment}
          defValue={isEdit ? job.equipment : ([] as DetailedEquipmentReference[])}
          placeholder="Search..."
        />
      </Widget>

      <Row type="flex" gutter={15}>
        <Col xs={24} sm={12} style={{ display: 'flex', flex: 1 }}>
          <Widget style={{ flex: 1 }}>
            <Row>
              <Col>
                <h3>Notification Users</h3>
              </Col>
            </Row>
            <SearchBox
              data={resUsers && resUsers.userByClientId ? (resUsers.userByClientId as UserReference[]) : []}
              handleSearch={handleUsersSearch}
              handleChange={handleNotificationUsersChange}
              loading={loadingUsers}
              defValue={state.selectedNotificationUsers}
              placeholder={resUsers && resUsers.userByClientId && resUsers.userByClientId.length > 0 ? 'Search users for notifications' : 'No Users Found'}
            />
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
                  data={resUsers && resUsers.operators ? (resUsers.operators as UserReference[]) : []}
                  handleSearch={handleUsersSearch}
                  handleChange={handleOperatorChange}
                  loading={loadingUsers}
                  defValue={isEdit && job.operators ? job.operators! : []}
                  placeholder={resUsers && resUsers.operators && resUsers.operators.length > 0 ? 'Search Operators...' : 'No Operators Found'}
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
                  data={resUsers && resUsers.mechanics ? (resUsers.mechanics as UserReference[]) : []}
                  handleSearch={handleUsersSearch}
                  handleChange={handleMechanicChange}
                  loading={loadingUsers}
                  defValue={isEdit && job.mechanics ? job.mechanics! : []}
                  placeholder={resUsers && resUsers.mechanics && resUsers.mechanics.length > 0 ? 'Search Mechanics...' : 'No Mechanics Found'}
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.actionButtons}>{actionButtons}</div>
        </Col>
      </Row>
    </Form>
  );
};
export default Form.create()(GetJob(JobForm));
