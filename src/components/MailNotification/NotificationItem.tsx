import React from 'react';
import { Avatar } from 'antd';

const NotificationItem = ({notification}: { notification: any}) => {
  const {image, badge, name, time, message} = notification;
  return (
    <li className="upm-media">
      <div className="upm-user-thumb upm-mr-3">
        <Avatar className="upm-size-40"
                alt={image}
                src={image}/>
        {badge > 0 ? <span className="upm-badge upm-badge-danger upm-text-white upm-rounded-circle">{badge}</span> : null}
      </div>
      <div className="upm-media-body">
        <div className="upm-flex-row upm-justify-content-between upm-align-items-center">
          <h5 className="upm-text-capitalize upm-user-name upm-mb-0"><span className="upm-link">{name}</span></h5>
          <span className="upm-meta-date"><small>{time}</small></span>
        </div>
        <p className="upm-fs-sm">{message}</p>
        <span className="upm-btn upm-btn-sm upm-top2 upm-text-muted"><i className="icon icon-reply upm-pr-2"/>Reply</span>
        <span className="upm-btn upm-btn-sm upm-top2 upm-text-muted"><i
          className="icon icon-custom-view upm-pr-2"/>Read</span>
      </div>
    </li>
  );
};

export default NotificationItem;
