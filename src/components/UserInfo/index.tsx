import React, { useContext } from 'react';
import { Avatar, Popover, Badge, Icon } from 'antd';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/react';

export default () => {
  const userContext = useContext(CurrentUserContext);
  const notificationCount = userContext.user.notificationCount;

  const userMenuOptions = (
    <ul className="upm-user-popover">
      <li>
        <Link to="my-account">
          <Trans defaults="My Account">My Account</Trans>
        </Link>
      </li>
      <li onClick={() => userContext.onLogout()}>Logout</li>
    </ul>
  );

  return (
    <>
      <Link to="notifications">
        <Badge count={notificationCount} style={{ marginRight: 15 }}>
          <Icon type="bell" style={{ width: '20px', marginRight: 15, fontSize: '20px', color: '#F5F5F5' }} theme="filled" />
        </Badge>
      </Link>

      <Popover overlayClassName="upm-popover-horizontal" placement="bottomRight" content={userMenuOptions} trigger="click">
        <div style={{ display: 'inline-block' }}>
          <Avatar icon="user" className="upm-avatar upm-pointer" alt="" style={{ color: '#121212' }} />
        </div>
      </Popover>
    </>
  );
};

// export default UserInfo;
