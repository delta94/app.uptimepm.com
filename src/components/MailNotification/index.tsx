import React from 'react';
import NotificationItem from './NotificationItem';
import { notifications } from './data';
import CustomScrollbars from '../../util/CustomScrollbars';

const MailNotification = () => {
  return (
    <>
      <div className="upm-popover-header">
        <h3 className="upm-mb-0">Messages</h3>
        <i className="upm-icon-btn icon icon-charvlet-down" />
      </div>
      <CustomScrollbars className="upm-popover-scroll">
        <ul className="upm-sub-popover">
          {notifications.map((notification, index) => (
            <NotificationItem key={index} notification={notification} />
          ))}
        </ul>
      </CustomScrollbars>
    </>
  );
};

export default MailNotification;
