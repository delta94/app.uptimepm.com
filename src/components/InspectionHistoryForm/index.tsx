import { Button, Col, Form, Input, Row, Select, Alert, InputNumber, Descriptions, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { FormEvent, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import './index.scss';
import {
  Inspection,
  useSaveInspectionMutation,
  InspectionInput,
  useEquipmentSelectionQuery,
  InspectionChecklistItemInput,
  InspectionChecklistItem,
  useClientForSelectionQuery,
  RoleTypeEnum,
} from 'generated';
import GetInspection from './GetInspection';
import { GraphQLError } from 'graphql';
import SingleDropdown from 'components/SingleDropdown';
import { removeTypename } from 'helpers/utils';
import InspectionCheckList from './InspectionCheckList';
import { allowed } from 'components/Routes/Access';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import moment from 'moment';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Print from './Print';
import Magnifier from 'react-magnifier';
const FormItem = Form.Item;
const Option = Select.Option;

export interface SaveInspectionProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  inspection: Inspection;
}

export const SaveInspection = ({ form, inspection, history }: SaveInspectionProps) => {
  const currentUserContext = useContext(CurrentUserContext);

  const isEdit = inspection.id ? true : false;
  const [mutate] = useSaveInspectionMutation();
  const { data: resEquipment } = useEquipmentSelectionQuery({ variables: { skip: 0, pageSize: 100, searchText: '' } });
  const { data: resClients } = useClientForSelectionQuery({ variables: { skip: 0, pageSize: 100, searchText: '' } });

  const err: GraphQLError[] = [];
  const [state] = React.useState({
    checklist: isEdit ? inspection.checklist : [{ consumable: false } as InspectionChecklistItemInput],
    mutationErrors: err,
  });

  const handleSubmit = (e: FormEvent<any>) => {
    e.preventDefault();
    form.validateFields(async (err: any, values: InspectionInput) => {
      if (err) {
        // console.log(err);
        return false;
      }
      try {
        // console.log(values);

        values.equipment = removeTypename(resEquipment!.equipment.equipment.find(c => c.id === values.equipmentId));

        if (allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Corporate, undefined, undefined))
          values.client = removeTypename(resClients!.clients.clients.find(c => c.id === values.clientId));

        const result = await mutate({ variables: { data: values } });
        if (result && result.data) {
          form.resetFields();
          currentUserContext.client.cache.data.delete('ROOT_QUERY');
          history.goBack();
        }
      } catch (ex) {}
    });
  };

  const cancel = () => {
    history.goBack();
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      {!isEdit && (
        <Col>
          <Button type="primary" htmlType="submit">
            Save Inspection
          </Button>
        </Col>
      )}
      <Col>
        {isEdit && (
          <PDFDownloadLink
            className="ant-btn"
            document={<Print inspection={isEdit ? inspection : ({ checklist: [{ consumable: false }] as InspectionChecklistItem[] } as Inspection)} />}
            fileName={'Inspection_' + (inspection.id ? inspection.id.split('/')[1] + '.pdf' : 'report.pdf')}
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
      </Col>
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Close
        </Button>
      </Col>
    </Row>
  );

  const { getFieldDecorator } = form;

  // console.log('Rending');

  return (
    <>
      <Form layout="vertical" onSubmit={handleSubmit}>
        <ContainerHeader
          title={`${inspection.id ? 'View Inspection: ' + inspection.id.split('/')[1] : 'Add New Inspection'} `}
          icon="pe-7s-display1 icon-gradient bg-premium-dark"
          actions={actionButtons}
        />

        <pre>
          {state.mutationErrors.map(({ message }, i) => (
            <Alert message={message} type="error" />
          ))}
        </pre>

        <FormItem style={{ height: 0, padding: 0, margin: 0 }}>
          {getFieldDecorator('id', {
            initialValue: inspection.id,
          })(<Input placeholder="id" type="hidden" />)}
        </FormItem>

        {!isEdit && ( // Insert Form
          <Widget>
            <Row gutter={10} type="flex">
              <Col xs={24} sm={8}>
                <SingleDropdown
                  label="Equipment"
                  required={true}
                  fieldName="equipmentId"
                  form={form}
                  placeholder="Please select equipment"
                  names={['name']}
                  defValue={isEdit ? inspection.equipment : null}
                  data={resEquipment && resEquipment.equipment ? resEquipment.equipment.equipment : []}
                />
              </Col>

              <Col xs={24} sm={8}>
                <FormItem label="Type">
                  {getFieldDecorator('type', {
                    initialValue: inspection.type,
                    rules: [
                      {
                        required: true,
                        message: 'Please select type',
                      },
                    ],
                  })(
                    <Select placeholder="Inspection Type">
                      <Option value="Pre-Shift">Pre-Shift</Option>
                      <Option value="Post-Shift">Post-Shift</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xs={24} sm={8}>
                <FormItem label="Meter Type">
                  {getFieldDecorator('meterValue', {
                    initialValue: inspection.meterValue,
                    rules: [
                      {
                        required: true,
                        message: isEdit ? `Please enter ${inspection.equipment.meterType}` : `Please enter meter value`,
                      },
                    ],
                  })(<InputNumber style={{ width: '100%' }} min={0} max={500000} placeholder="Meter value" />)}
                </FormItem>
              </Col>
            </Row>

            {allowed(currentUserContext.user, ['Administrator'], RoleTypeEnum.Corporate, undefined, undefined) && (
              <Row gutter={10} type="flex">
                <Col xs={24} sm={12}>
                  <SingleDropdown
                    label="Client"
                    required={true}
                    fieldName="clientId"
                    form={form}
                    placeholder="Please select a client"
                    names={['name']}
                    defValue={isEdit ? inspection.client : null}
                    data={resClients && resClients.clients ? resClients.clients.clients : []}
                  />
                </Col>
              </Row>
            )}
          </Widget>
        )}

        <Row type="flex" align="top" gutter={12}>
          <Col xs={24} sm={8}>
            {isEdit && (
              <>
                <Row>
                  <Col>
                    <h3>{inspection.equipment.name}</h3>
                  </Col>
                </Row>
                <div style={{ background: '#ffffff' }}>
                  <Descriptions bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                    <Descriptions.Item label="Usage">
                      {inspection.equipment.meterType !== '' && (
                        <p>
                          {inspection.meterValue} {inspection.equipment.meterType}
                        </p>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Meter Image">
                      {inspection.meterImage && (
                        <Magnifier src={inspection.meterImage!} mgShape="square" mgTouchOffsetX={100} mgWidth={400} mgHeight={400} zoomFactor={2.25} />
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">{inspection.type}</Descriptions.Item>
                    {inspection.client && <Descriptions.Item label="Client">{inspection.client.name}</Descriptions.Item>}
                    {inspection.supervisor && (
                      <Descriptions.Item label="Supervisor">
                        {inspection.supervisor.firstName} {inspection.supervisor.lastName}
                      </Descriptions.Item>
                    )}

                    <Descriptions.Item label="Submitted By:">
                      {inspection.who.firstName} {inspection.who.lastName}
                    </Descriptions.Item>

                    <Descriptions.Item label="Completed">{moment(inspection.completedOn).format('MMM DD YYYY')}</Descriptions.Item>
                  </Descriptions>
                </div>
              </>
            )}
          </Col>
          <Col xs={24} sm={16}>
            <Row>
              <Col>
                <h3>Checklist Items</h3>
              </Col>
            </Row>
            <InspectionCheckList
              inspectionId={inspection.id!}
              isEdit={isEdit}
              form={form}
              checklist={isEdit ? inspection.checklist : [{ consumable: false } as InspectionChecklistItem]}
            />
          </Col>
        </Row>

        <Row>
          <div className="actionButtons">{actionButtons}</div>
        </Row>
      </Form>
    </>
  );
};

export default Form.create()(GetInspection(SaveInspection));
