import React from 'react';
import PropTypes from 'prop-types';

const WidgetHeader = ({title, extra, styleName}: any) => {

  return (
    <h2 className={`upm-entry-title ${styleName}`}>
      {title}
      <span className="upm-text-primary upm-fs-md upm-pointer upm-ml-auto upm-d-none upm-d-sm-block">{extra}</span>
    </h2>
  );
};

WidgetHeader.defaultProps = {
  styleName: '',
};

WidgetHeader.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
};

export default WidgetHeader;
