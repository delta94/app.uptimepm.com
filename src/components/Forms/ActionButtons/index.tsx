import * as React from 'react';
import { Row, Col, Button } from 'antd';

export interface ActionButtonsProps {
  submitText: string;
  onCancel: () => void;
}

export default (props: ActionButtonsProps) => {
  return (
    <Row gutter={10} type="flex">
      <Col>
        <Button type="primary" htmlType="submit">
          {props.submitText}
        </Button>
      </Col>
      <Col>
        <Button className="cancel-btn" onClick={props.onCancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  );
};
