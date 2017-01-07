import React from 'react';
import { Avatar } from 'antd';

const NotificationItem = ({
  notification,
}: {
  notification: { icon: any; image: any; title: any; time: any };
}) => {
  const { icon, image, title, time } = notification;
  return (
    <li className="upm-media">
      <Avatar className="upm-size-40 upm-mr-3" alt={image} src={image} />
      <div className="upm-media-body upm-align-self-center">
        <p className="upm-fs-sm upm-mb-0">{title}</p>
        <i className={`icon icon-${icon} upm-pr-2`} />{' '}
        <span className="upm-meta-date">
          <small>{time}</small>
        </span>
      </div>
    </li>
  );
};

export default NotificationItem;
