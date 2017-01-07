import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';
import { Icon, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React, { Component, Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import UserAvatar from 'components/Avatar';
import { CurrentUserConsumer } from 'contexts/CurrentUserContext';

class Navbar extends Component<RouteComponentProps> {
  handleClick = (key: any) => {
    this.props.history.push(key);
  };

  handleMenuClick = (e: ClickParam) => {
    this.props.history.push(e.key);
  };

  render() {
    const SubMenu = Menu.SubMenu;
    return (
      <div>
        <CurrentUserConsumer>
          {userContext => (
            <Fragment>
              <div>
                <UserAvatar name={userContext && userContext.user ? `${userContext.user.firstName} ${userContext.user.lastName}` : ''} />
              </div>

              <Menu onClick={this.handleMenuClick} selectedKeys={[this.props.history.location.pathname]} mode="vertical" className="App-menu-wrapper">
                <SubMenu
                  key="/dashboard"
                  title={
                    <span>
                      <Icon type="bar-chart" />
                      <Trans defaults="Dashboard">Dashboard</Trans>
                      {/* <NavLink to="/">Dashboard</NavLink> */}
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/users"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Users">Users</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/roles"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Roles">Roles</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/clients"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Clients">Clients</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/dealers"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Dealers">Dealers</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/equipment"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Equipment">Equipment</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/work-orders"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Work Orders">Work Orders</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/inspections"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Inspections">Inspections</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/service-intervals"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Service Intervals">Service Intervals</Trans>
                    </span>
                  }
                  onTitleClick={this.handleClick}
                />
                <SubMenu
                  key="/logout"
                  title={
                    <span>
                      <Icon type="form" />
                      <Trans defaults="Logout">Logout</Trans>
                    </span>
                  }
                  onTitleClick={() => {
                    if (userContext) userContext.onLogout();
                  }}
                />
              </Menu>
            </Fragment>
          )}
        </CurrentUserConsumer>
      </div>
    );
  }
}

export default withRouter(Navbar);
