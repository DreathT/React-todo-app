import React from 'react';
import { Layout } from 'antd';
import Navbar from '../../components/layouts/navbar';
import Sidebar from '../../components/layouts/sidebar';
import TodoList from '../../components/home/todolist';
import CalendarView from '../../components/home/calendarview';
import { TodoProvider } from '../../components/home/todocontext';
import './todos.css';

const { Header, Sider, Content } = Layout;

function Todos() {
  return (
    <TodoProvider>
      <Layout style={{ height: '100vh' }}>
        <Header className="header">
          <Navbar />
        </Header>
        <Layout>
          <Sider className="sider">
            <Sidebar />
          </Sider>
          <Content className="content">
            <div className="split-content">
              <div className="left-content">
                <TodoList />
              </div>
              <div className="right-content">
                <CalendarView />
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </TodoProvider>
  );
}

export default Todos;