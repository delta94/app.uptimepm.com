import React from 'react';
import { Col, Row } from 'antd';
import Widget from 'components/Widget';
import InspectionWho from './InspectionWho';

export default () => {
  return (
    <>
      <Row type="flex" gutter={10}>
        {/* <Col xs={24} sm={12}>
          <Widget>
            <h4>Other</h4>
          </Widget>
        </Col> */}
        <Col xs={24}>
          <Widget>
            <h4>Total inspections by user</h4>
            <InspectionWho />
          </Widget>
        </Col>
      </Row>
    </>
  );
};
