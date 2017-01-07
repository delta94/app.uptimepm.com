import React, { useContext } from 'react';
import { Badge, Icon, Avatar } from 'antd';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import './index.scss';
import { RoleTypeEnum } from 'generated';

export default () => {
  const userContext = useContext(CurrentUserContext);
  let isClient;
  if (userContext.user.roles) {
    isClient = userContext.user.roles.findIndex(x => x.type === RoleTypeEnum.Client) !== -1;
  }
  const notificationCount = userContext.user.notificationCount;

  return (
    <>
      <div className="user-profile upm-flex-row upm-align-items-center upm-avatar-row">
        <span className="upm-avatar-name" style={{ paddingRight: 0, width: '90%' }}>
          {userContext.user && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: 5, fontSize: 16 }}>Welcome Back </div>

              <div>
                {userContext.user.firstName} {userContext.user.lastName}
              </div>
            </div>
          )}
          <span className="right-icons">
            <Link to="/client/my-account">
              <Avatar size={18} icon="user" className="one-item upm-avatar upm-pointer" />
            </Link>
            {isClient && (
              <Link to="notifications" className="one-item one-item-bell">
                <Badge count={notificationCount}>
                  <Icon type="bell" />
                </Badge>
              </Link>
            )}

            <div className="one-item" onClick={() => userContext.onLogout()}>
              <Icon type="logout" />
            </div>
          </span>
        </span>
      </div>
    </>
  );
};
