import React from 'react';
import { Menu } from 'antd';
import './sidebar.css'

const Sidebar = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0, left: 0}}
    >
      <Menu.Item key="1">Todo's</Menu.Item>
      <Menu.Item key="2">Profile</Menu.Item>
      <Menu.Item key="3">Settings</Menu.Item>
    </Menu>
  );
}

export default Sidebar;
