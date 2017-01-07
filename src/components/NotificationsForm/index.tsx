import { Button, Col, Form, Row, Descriptions } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import ContainerHeader from 'components/ContainerHeader';
import Widget from 'components/Widget';
import { Notification } from 'generated';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import GetNotification from './GetNotification';
import moment from 'moment';
import './index.scss';
const FormItem = Form.Item;

export interface IProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  notification: Notification;
}

export const NotificationForm = (props: IProps) => {
  const isCorporate = props.location.pathname.indexOf('corporate') !== -1;
  const currentUserContext = useContext(CurrentUserContext);
  const notification = props.notification;

  const cancel = () => {
    isCorporate ? props.history.push('/corporate/notifications') : props.history.push('/client/notifications');
  };

  const actionButtons = (
    <Row gutter={10} type="flex">
      <Col>
        <Button className="cancel-btn" onClick={cancel}>
          Back
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      <Form layout="vertical">
        <ContainerHeader title="Notification View" icon="pe-7s-display1 icon-gradient bg-premium-dark" actions={actionButtons} />
        <Widget>
          <>
            <Row gutter={10} type="flex">
              <Col xs={24} sm={16}>
                <h3>Notification Details</h3>
              </Col>
              <Col xs={24} sm={2} className="status">
                <h5>Type:</h5>
              </Col>
              <Col xs={24} sm={6}>
                <FormItem>{notification.notificationSource.toString()}</FormItem>
              </Col>
            </Row>
            <div style={{ background: '#ffffff' }}>
              <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                <Descriptions.Item label="Issue Date">{notification.createdOn && moment(notification.createdOn).format('MMM DD YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Equipment">{notification.equipment ? notification.equipment.name : null}</Descriptions.Item>
                <Descriptions.Item label="Vin Or Serial">{notification.equipment ? notification.equipment.vinOrSerial : null}</Descriptions.Item>
                <Descriptions.Item label="Make">{notification.equipment && notification.equipment.make ? notification.equipment.make : null}</Descriptions.Item>
                <Descriptions.Item label="Office Location">{notification.officeLocation.name}</Descriptions.Item>

                {currentUserContext.corporateUser() && <Descriptions.Item label="Client">{notification.client && notification.client.name}</Descriptions.Item>}
                <Descriptions.Item label="Alerted Users">
                  {notification.alertedUsers && notification.alertedUsers.map(x => x.firstName + ' ' + x.lastName + ',')}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </>
        </Widget>
        <Row>
          <div className="actionButtons">{actionButtons}</div>
        </Row>
      </Form>
    </>
  );
};
export default Form.create()(GetNotification(NotificationForm));
