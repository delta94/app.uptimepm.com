import React, { FormEvent, useContext, useState } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { RouteComponentProps } from 'react-router';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import ActionButtons from 'components/Forms/ActionButtons';
import {
  useSaveOfficeLocationMutation,
  OfficeLocation,
  useClientsQuery,
  UserReference,
  useUsersWithOperatorsAndMechanicsQuery,
  useClientsForSelectionMutation,
  IdNameReference,
  useEquipmentForSelectQuery,
  DetailedEquipmentReference,
  OfficeLocationReference,
} from 'generated';
import { removeTypename } from 'helpers/utils';
import Phones from 'components/Phones';
import Addresses from 'components/Addresses';
import GetOfficeLocation from './GetOfficeLocation';
import SearchBox from 'components/EquipmentForm/SearchBox';

import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { customStyles } from 'components/common/styles';
import EquipmentBox from 'components/JobForm/EquipmentBox';
const FormItem = Form.Item;

export interface OfficeLocationProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  officeLocation: OfficeLocation;
}

export const OfficeLocationForm = (props: OfficeLocationProps) => {
  const isCorporate = props.location.pathname.indexOf('corporate') !== -1;
  const isEdit = props.officeLocation.id ? true : false;
  const { form, officeLocation } = props;
  const { getFieldDecorator } = form;
  const currentUserContext = useContext(CurrentUserContext);
  const [clientSearchText] = useState(officeLocation.client ? officeLocation.client.name : '');
  const [saveOfficeLocation] = useSaveOfficeLocationMutation();
  const [findClients] = useClientsForSelectionMutation();

  const { loading } = useClientsQuery({
    variables: { skip: 0, pageSize: 10, searchText: clientSearchText },
    skip: currentUserContext.clientUser(),
  });

  const [state, setState] = useState({
    userSearchText: '',
    selectedOperators: isEdit && officeLocation.operators ? officeLocation.operators : [],
    selectedMechanics: isEdit && officeLocation.mechanics ? officeLocation.mechanics : [],
    selectedAdministrator: isEdit && officeLocation.administrator ? officeLocation.administrator : {},
    selectedNotificationUsers: isEdit && officeLocation.notificationUsers ? officeLocation.notificationUsers : {},
    clientId: props.officeLocation.client ? props.officeLocation.client.id : currentUserContext.user.client ? currentUserContext.user.client!.id : '',
    equipmentSearchText: '',
    usersSearchText: '',
    selectedEquipment: isEdit && officeLocation.equipment ? officeLocation.equipment : [],
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

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    const form = props.form;
    form.validateFields(async (err: any, values: any) => {
      if (err) {
        // console.log(err);
        return false;
      }

      values.mechanics = removeTypename(state.selectedMechanics);
      values.operators = removeTypename(state.selectedOperators);
      values.administrator = removeTypename(values.administrator.value);
      values.client = values.client ? removeTypename(values.client.value) : removeTypename(currentUserContext.user.client);
      values.equipment = removeTypename(state.selectedEquipment);
      values.notificationUsers = removeTypename(state.selectedNotificationUsers);

      const result = await saveOfficeLocation({ variables: { data: values } });

      if (result && result.data) {
        form.resetFields();
        props.history.goBack();
      }
    });
  };

  const handleOperatorChange = (selectedOperators: any) => {
    setState({ ...state, selectedOperators: selectedOperators });
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

  const usersOptions = loading
    ? []
    : !loading && resUsers && resUsers.userByClientId
    ? resUsers.userByClientId.map(d => ({ value: removeTypename(d), label: `${d.firstName} ${d.lastName}` }))
    : [];

  const clientSearch = async (newValue: any): Promise<{ value: IdNameReference; label: string }[] | null> => {
    const result = await findClients({ variables: { searchText: newValue } }).catch(ex => console.log('ex.message', ex.message));
    if (result && result.data) {
      const options = result.data.clientsForSelection.map(c => ({ value: removeTypename(c), label: c.name }));
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

  const createJob = () => {
    // gets only the 3 items from office
    const officeLocationRef = (({ id, name }) => ({ id, name }))(officeLocation) as OfficeLocationReference;

    isCorporate
      ? props.history.push('/corporate/jobs/add', { client: officeLocation.client, officeLocation: officeLocationRef })
      : props.history.push('/client/jobs/add', { client: officeLocation.client, officeLocation: officeLocationRef });
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      <Col>
        <Button type="primary" htmlType="submit">
          Save Office Location
        </Button>
      </Col>
      {isEdit && (
        <Col>
          <Button className="cancel-btn" onClick={createJob}>
            Create Job
          </Button>
        </Col>
      )}

      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );

  return (
    <Form layout="vertical" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <ContainerHeader title={`${isEdit ? 'Edit' : 'Add'} Office Location`} icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
      <Widget>
        {getFieldDecorator('id', {
          initialValue: officeLocation.id,
        })(<Input placeholder="id" type="hidden" />)}

        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: officeLocation.name,
            rules: [{ required: true, message: 'Please input name' }],
          })(<Input placeholder="Name" />)}
        </FormItem>
        <FormItem label="Administrator">
          {getFieldDecorator('administrator', {
            initialValue: officeLocation.administrator
              ? {
                  value: removeTypename(officeLocation.administrator),
                  label: `${officeLocation.administrator.firstName} ${officeLocation.administrator.lastName}`,
                }
              : { value: null, label: '' },
            rules: [
              { required: true, message: 'Please Select Administrator' },
              {
                validator: (rule, value, callback) => {
                  if (value.value === null) return callback('Please Select Administrator');
                  return callback();
                },
              },
            ],
          })(<ReactSelect options={usersOptions} getOptionValue={option => option.value} style={{ width: '100%' }} />)}
        </FormItem>
        {currentUserContext.corporateUser() ? (
          <FormItem label="Client">
            {getFieldDecorator('client', {
              initialValue: officeLocation.client ? { value: removeTypename(officeLocation.client), label: officeLocation.client.name } : null,
              rules: [
                {
                  required: true,
                  message: 'Client is Required',
                },
              ],
            })(
              <AsyncSelect
                styles={customStyles}
                noOptionsMessage={() => `Start Typing...`}
                placeholder="Client..."
                onChange={(client: any) => setState({ ...state, clientId: client ? client.value.id : null })}
                loadOptions={clientSearch}
              />
            )}
          </FormItem>
        ) : null}
      </Widget>
      <Widget>
        <h3>Equipment</h3>
        <EquipmentBox
          data={resEquipment && resEquipment.equipmentForSelect ? resEquipment.equipmentForSelect : ([] as DetailedEquipmentReference[])}
          handleSearch={handleEquipmentSearch}
          handleChange={handleEquipmentChange}
          loading={loadingEquipment}
          defValue={isEdit && officeLocation.equipment ? officeLocation.equipment : ([] as DetailedEquipmentReference[])}
          placeholder="Search..."
        />
      </Widget>
      <Widget>
        <Row>
          <Col>
            <h3>Phones</h3>
          </Col>
        </Row>
        <Phones isRequired={true} phones={officeLocation.phones ? officeLocation.phones : []} form={form} />
      </Widget>

      <Widget>
        <Row>
          <Col>
            <h3>Addresses</h3>
          </Col>
        </Row>
        <Addresses isRequired={true} addresses={officeLocation.addresses ? officeLocation.addresses : []} form={form} />
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
              defValue={isEdit && officeLocation.notificationUsers ? officeLocation.notificationUsers! : []}
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
                  defValue={isEdit && officeLocation.operators ? officeLocation.operators! : []}
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
                  defValue={isEdit && officeLocation.mechanics ? officeLocation.mechanics! : []}
                  placeholder={resUsers && resUsers.mechanics && resUsers.mechanics.length > 0 ? 'Search Mechanics...' : 'No Mechanics Found'}
                />
              </Col>
            </Row>
          </Widget>
        </Col>
      </Row>
      <Row>
        <ActionButtons onCancel={cancel} submitText="Save Office Location" />
      </Row>
    </Form>
  );
};
export default Form.create()(GetOfficeLocation(OfficeLocationForm));
