import React from 'react';

import { WorkOrderHistoryItem } from 'generated';
import { Comment, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
interface IProps {
  item: WorkOrderHistoryItem;
}

const WorkItemsHistoryItem = (props: IProps) => {
  return (
    <Comment
      // actions={actions}
      author={<Link to={`../${props.item.user.id}`}>{props.item.user.firstName + ' ' + props.item.user.lastName}</Link>}
      avatar={<Avatar icon="user" />}
      content={<p>{props.item.message}</p>}
      datetime={
        <Tooltip title={DateTime.fromISO(props.item.enteredOn, { zone: 'local' }).toLocaleString(DateTime.DATETIME_SHORT)}>
          <span>{moment(props.item.enteredOn).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};
export default WorkItemsHistoryItem;
