import './LoadingSpinner.scss';
import { Icon, Spin } from 'antd';
import * as React from 'react';
const antIcon = <Icon type="reload" spin />;

export interface LoadingSpinnerProps {
  tip?: string;
  spinning?: boolean;
}

const LoadingSpinner: React.SFC<LoadingSpinnerProps> = props => {
  return (
    <Spin spinning={props.spinning ? props.spinning : true} size="large" indicator={antIcon} tip={props.tip ? props.tip : 'Loading.. Please Wait.'}>
      <div style={{ minWidth: '100vw', minHeight: '100vh' }} />
    </Spin>
  );
};

export default LoadingSpinner;
