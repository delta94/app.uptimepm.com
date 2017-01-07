import * as React from 'react';
import { WorkOrderHistoryItem } from 'generated';
import { Comment, Avatar } from 'antd';
import { DateTime } from 'luxon';
import Widget from 'components/Widget';

export interface IHistoryItemsProps {
  historyItems: WorkOrderHistoryItem[];
}

export default (props: IHistoryItemsProps) => {
  return (
    <Widget>
      {props.historyItems.map(item => (
        <Comment
          // actions={actions}
          author={`${item.user.firstName} ${item.user.lastName}`}
          avatar={<Avatar icon="user" />}
          content={<p>{item.message}</p>}
          datetime={DateTime.fromISO(item.enteredOn, { zone: 'local' }).toLocaleString(DateTime.DATETIME_SHORT)}
        />
        // <Row type="flex" gutter={10}>
        //   <Col>
        //     <div>
        //       {item.user.firstName} {item.user.lastName}
        //     </div>
        //     <div>{DateTime.fromISO(item.enteredOn, { zone: 'local' }).toLocaleString(DateTime.DATETIME_SHORT)}</div>
        //   </Col>
        //   <Col>{item.message}</Col>
        // </Row>
      ))}
    </Widget>
  );
};
