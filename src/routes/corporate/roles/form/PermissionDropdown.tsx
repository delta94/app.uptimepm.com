import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Select } from 'antd';
import { ROLE_PERMISSIONS } from '../role.queries';

const Option = Select.Option;

interface IUserListProps {
  onChange?: (changedValue: string) => void;
  name?: string;
}

class PermissionDropdown extends Component<IUserListProps> {
  state = {
    selected: this.props.name,
  };

  handleChange = (changedValue: string) => {
    this.setState({ selected: changedValue });
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    return (
      <Query<any, any> query={ROLE_PERMISSIONS}>
        {({ loading, data, error }) => (
          <div>
            <Select placeholder="Please select name" onChange={this.handleChange} value={this.state.selected}>
              {data.rolePermissions
                ? data.rolePermissions.map((item: any, index: any) => {
                    return (
                      <Option key={index} value={item.name}>
                        {item.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </div>
        )}
      </Query>
    );
  }
}

export default PermissionDropdown;
