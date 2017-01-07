import React, { FormEvent, useContext, useState } from 'react';
import { Form, Row, Col, Select, Descriptions, Input, Button, Tabs } from 'antd';
import { RouteComponentProps } from 'react-router';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import GetWorkOrder from './GetWorkOrder';
import ContainerHeader from 'components/ContainerHeader';
import './index.scss';

import { Permission, RoleTypeEnum, WorkOrder, useSaveWorkOrderStatusMutation, WorkOrderStatusInput, useUsersForSelectionQuery, UserReference } from 'generated';
import TextArea from 'antd/lib/input/TextArea';
import { allowed } from 'components/Routes/Access';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import moment from 'moment';
import SearchBox from 'components/EquipmentForm/SearchBox';
import { removeTypename } from 'helpers/utils';
import WorkItems from './WorkItems';
import HistoryItems from './HistoryItems';

const FormItem = Form.Item;
const Option = Select.Option;

export interface IProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  workOrder: WorkOrder;
  permissions: Permission[];
}

export const FormWorkOrder = (props: IProps) => {
  const isCorporate = props.location.pathname.indexOf('corporate') !== -1;

  const {
    workOrder,
    form: { getFieldDecorator },
  } = props;
  const currentUserContext = useContext(CurrentUserContext);

  const [state, setState] = useState({
    userSearchText: '',
    selectedMechanics: workOrder.assignedTo,
  });

  const form = props.form;
  const isEdit = true;
  const [saveWorkOrder, { loading: saving }] = useSaveWorkOrderStatusMutation();
  const { loading: loadingUsers, data: resUsers } = useUsersForSelectionQuery({
    fetchPolicy: 'network-only',
    variables: { skip: 0, pageSize: 100, searchText: state.userSearchText },
  });

  const cancel = () => {
    isCorporate ? props.history.push('/corporate/work-orders') : props.history.push('/client/work-orders');
  };

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();

    form.validateFields(async (err: any, values: WorkOrderStatusInput) => {
      if (err) {
        // console.log('Errors', err);
        return false;
      }
      values.assignedTo = removeTypename(state.selectedMechanics);

      const result = await saveWorkOrder({ variables: { data: values } });

      // console.log('result', result);
      if (result) {
        form.resetFields();
        if (values.id) {
          currentUserContext.client.cache.data.delete('WorkOrder:' + values.id);
        }
        isCorporate ? props.history.push('/corporate/work-orders') : props.history.push('/client/work-orders');
      } else {
        // console.log('not result', result);
      }
    });
  };

  const handleMechanicSearch = (s: string) => {
    setState({ ...state, userSearchText: s });
  };

  const handleMechanicChange = (selectedMechanics: any) => {
    setState({ ...state, selectedMechanics: selectedMechanics });
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      {/* <Col>
        {isEdit && (
          <PDFDownloadLink
            className="ant-btn"
            document={<Print workOrders={isEdit ? [workOrder] : [{} as WorkOrder]} />}
            fileName={'WorkOrder_' + (workOrder.id ? workOrder.id.split('/')[1] + '.pdf' : 'report.pdf')}
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <div>Loading document...</div>
              ) : (
                <div>
                  <Icon type="printer" /> <span>Save as PDF</span>
                </div>
              )
            }
          </PDFDownloadLink>
        )}
      </Col> */}
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Cancel
        </Button>
      </Col>
      <Col>
        <Button loading={saving} type="primary" htmlType="submit">
          Save Work Order
        </Button>
      </Col>
    </Row>
  );

  // Un comment me to test on live
  // const toDataUrl = (url: string, callback: any) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.onload = (xml: any) => {
  //     if (xml.status == 200) {
  //       const myBlob = xml.response;
  //       console.log('ok');
  //     } else {
  //       console.log('no');
  //     }

  //   };
  //   xhr.open('GET', url);

  //   xhr.responseType = 'blob';
  //   xhr.send();
  // };
  // if (workOrder.photos && workOrder.photos.length > 0) toDataUrl(workOrder.photos[0], ()=>console.log('done'));

  return (
    <Form layout="vertical" onSubmit={handleSubmit} className="work-order-form">
      <ContainerHeader title={(isEdit ? 'Edit ' : 'Add ') + 'Work Order'} icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
      <FormItem style={{ height: 0, padding: 0, margin: 0 }}>
        {getFieldDecorator('id', {
          initialValue: workOrder.id,
        })(<Input placeholder="id" type="hidden" />)}
      </FormItem>
      {isEdit && (
        <>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={16}>
              <h3>Work Order Details</h3>
            </Col>
            <Col xs={24} sm={2} className="status">
              <h5>Status:</h5>
            </Col>
            <Col xs={24} sm={6}>
              <FormItem>
                {getFieldDecorator('status', {
                  initialValue: workOrder.status,
                  rules: [{ required: true, message: 'Please select the status!' }],
                })(
                  <Select placeholder="Please select the status">
                    <Option value="Open">Open</Option>
                    <Option value="AssessingRepair">Assessing Repair</Option>
                    <Option value="WaitingForParts">Waiting for Parts</Option>
                    <Option value="InProgress">InProgress</Option>
                    <Option value="Completed">Completed</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <div style={{ background: '#ffffff' }}>
            <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
              <Descriptions.Item label="Issue Date">{workOrder.createdOn && moment(workOrder.createdOn).format('MMM DD YYYY')}</Descriptions.Item>
              <Descriptions.Item label="Assigned Date">{workOrder.assignedOn && moment(workOrder.assignedOn).format('MMM DD YYYY')}</Descriptions.Item>
              <Descriptions.Item label="Equipment">{workOrder.equipment ? workOrder.equipment.name : null}</Descriptions.Item>
              <Descriptions.Item label="Vin Or Serial">{workOrder.equipment ? workOrder.equipment.vinOrSerial : null}</Descriptions.Item>
              <Descriptions.Item label="Make">{workOrder.equipment && workOrder.equipment.make ? workOrder.equipment.make : null}</Descriptions.Item>
              <Descriptions.Item label="Model">{workOrder.equipment && workOrder.equipment.model ? workOrder.equipment.model : null}</Descriptions.Item>
              <Descriptions.Item label="Nickname">
                {workOrder.equipment && workOrder.equipment.nickname ? workOrder.equipment.nickname : null}
              </Descriptions.Item>
              <Descriptions.Item label="Meter">
                {workOrder.meterValue && workOrder.equipment ? workOrder.meterValue + ' ' + workOrder.equipment.meterType : null}
              </Descriptions.Item>
              <Descriptions.Item label="Office Location">{workOrder.officeLocation ? workOrder.officeLocation.name : null}</Descriptions.Item>
              <Descriptions.Item label="Job">{workOrder.job ? workOrder.job.name : null}</Descriptions.Item>
              <Descriptions.Item label="Reported by">
                {workOrder.reportedBy ? workOrder.reportedBy.firstName + ' ' + workOrder.reportedBy.lastName : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Assigned to">
                {workOrder.assignedTo && workOrder.assignedTo.map(x => x.firstName + ' ' + x.lastName).join(',')}
              </Descriptions.Item>
              {workOrder.serviceInterval && <Descriptions.Item label="Service Interval">{workOrder.serviceInterval.title}</Descriptions.Item>}
              {workOrder.serviceInterval && (
                <Descriptions.Item label={`Milestone (${workOrder.serviceInterval.milestone.oneTime ? 'One Time' : 'Recurring'})`}>
                  {workOrder.serviceInterval.milestone.title}
                </Descriptions.Item>
              )}
              {workOrder.inspection && (
                <Descriptions.Item span={2} label="Inspection">
                  {workOrder.inspection.title}
                </Descriptions.Item>
              )}
              {/* {workOrder.inspection && workOrder.inspection.inspectionChecklists && (
                <Descriptions.Item label={`Checklist`}>
                  {workOrder.inspection.inspectionChecklists.map((item: IdTitleReference, index: number) => {
                    return (
                      <>
                        {`${index + 1}. ${item.title}`}
                        <br />
                      </>
                    );
                  })}
                </Descriptions.Item>
              )} */}
              {currentUserContext.corporateUser() && <Descriptions.Item label="Client">{workOrder.client && workOrder.client.name}</Descriptions.Item>}
            </Descriptions>
          </div>
        </>
      )}
      <br />
      <Row gutter={10} type="flex">
        <Col xs={24} sm={12}>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={16}>
              <h3>Assign To Users </h3>
            </Col>
          </Row>
          <FormItem>
            <SearchBox
              data={resUsers && resUsers.users ? (resUsers.users.users as UserReference[]) : []}
              handleSearch={handleMechanicSearch}
              handleChange={handleMechanicChange}
              loading={loadingUsers}
              defValue={workOrder.assignedTo}
              placeholder="Search Mechanics..."
            />
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={16}>
              <h3>Notes </h3>
            </Col>
          </Row>
          <FormItem>
            {getFieldDecorator('notes', {
              initialValue: workOrder.notes,
              trigger: 'onBlur',
              valuePropName: 'defaultValue',
              rules: [{ required: false, message: 'Please insert notes!' }],
            })(<TextArea className="ant-input has-error" placeholder="Notes" rows={4} />)}
          </FormItem>
        </Col>
      </Row>
      <Tabs defaultActiveKey="WorkItems">
        <Tabs.TabPane tab="Work Items" key="WorkItems" forceRender={true}>
          <WorkItems workItems={workOrder.workItems} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="History" key="History" forceRender={true}>
          <HistoryItems historyItems={workOrder.history} />
        </Tabs.TabPane>
      </Tabs>
      <br />
      {!isEdit && (
        <>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={12}>
              <FormItem label="Status">
                {getFieldDecorator('status', {
                  initialValue: workOrder.status,
                  rules: [{ required: true, message: 'Please select the status!' }],
                })(
                  <Select placeholder="Please select the status">
                    <Option value="Open">Open</Option>
                    <Option value="AssessingRepair">Assessing Repair</Option>
                    <Option value="WaitingForParts">Waiting for Parts</Option>
                    <Option value="InProgress">InProgress</Option>
                    <Option value="Completed">Completed</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10} type="flex">
            <Col xs={24} sm={12}>
              {/* <SingleDropdown
                  label="Equipment"
                  required={true}
                  fieldName="equipmentId"
                  form={form}
                  placeholder="Please select equipment"
                  names={['name']}
                  defValue={isEdit ? workOrder.equipment : null}
                  data={resEquipment && resEquipment.equipment ? resEquipment.equipment.equipment : []}
                /> */}
            </Col>
          </Row>
          {allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Corporate, undefined, undefined) && (
            <Row gutter={10} type="flex">
              <Col xs={24} sm={12}>
                {/* <SingleDropdown
                    label="Client"
                    required={true}
                    fieldName="clientId"
                    form={props.form}
                    placeholder="Clients"
                    names={['name']}
                    defValue={isEdit ? workOrder.client : null}
                    data={resClients && resClients.clients ? resClients.clients.clients : []}
                  /> */}
              </Col>
            </Row>
          )}

          <Row gutter={10} type="flex">
            <Col xs={24} sm={12}>
              <FormItem label="Operator">
                {/* <MultipleDropdown
                    // onSearching={handleOperatorSearch}
                    loadingData={loadingUsers}
                    fieldName="assignedToIds"
                    form={props.form}
                    placeholder="Assign it to users"
                    defValue={isEdit ? workOrder.assignedTo! : []}
                    names={['firstName', 'lastName']}
                    data={resUsers && resUsers.users ? resUsers.users.users : []}
                  /> */}
              </FormItem>
            </Col>
          </Row>
        </>
      )}
      {/* <Row>
        <Col xs={24} sm={12}>
          <ListPhotos defValue={workOrder.photos ? workOrder.photos : []} photoList={workOrder.photos ? workOrder.photos : []} fieldName={'photos'} />
        </Col>
      </Row> */}
      <Row style={{ marginBottom: 30 }}>
        <div className="actionButtons">{actionButtons}</div>
      </Row>
    </Form>
  );
};

export default Form.create()(GetWorkOrder(FormWorkOrder));
