import React from 'react';
import styles from './index.module.scss';
import { Row, Col } from 'antd';

const ContainerHeader = ({
  title,
  match,
  actions,
  subheading,
  icon,
  description,
}: {
  title?: string | React.ReactNode;
  match?: any;
  description?: string;
  actions?: React.ReactNode;
  subheading?: string;
  icon?: string;
}) => {
  return (
    <Row className={styles.pageHeading} type="flex" justify="space-between" align="bottom">
      <Col>
        <h2 className={styles.pageTitle}>{title}</h2>
        {subheading && <h3 className={styles.pageSubHeading}>{subheading}</h3>}
      </Col>
      <Col>{actions && <div className={styles.pageActions}>{actions}</div>}</Col>
    </Row>
  );
};

export default ContainerHeader;
