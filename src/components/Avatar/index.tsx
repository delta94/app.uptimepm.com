import React from 'react';

import { Avatar } from 'antd';
import './avatar.css';

type IUserAvatar = {
  name: string;
};

const UserAvatar = ({ name }: IUserAvatar) => (
  <div className="App-user">
    <Avatar size={64} icon="user" />
    <div className="App-username">{name}</div>
  </div>
);

export default UserAvatar;
