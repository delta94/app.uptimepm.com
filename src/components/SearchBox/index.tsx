import React from 'react';

const SearchBox = ({
  styleName,
  placeholder,
  onChange,
  value,
}: {
  styleName: any;
  placeholder: any;
  onChange: any;
  value: any;
}) => {
  return (
    <div className={`upm-search-bar ${styleName}`}>
      <div className="upm-form-group">
        <input
          className="ant-input"
          type="search"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <span className="upm-search-icon upm-pointer">
          <i className="icon icon-search" />
        </span>
      </div>
    </div>
  );
};
export default SearchBox;

SearchBox.defaultProps = {
  styleName: '',
  value: '',
};
