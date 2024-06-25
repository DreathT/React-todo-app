import React, { useState, useContext } from 'react';
import { Input, Button, List, DatePicker, Card, Checkbox, Modal, TimePicker } from 'antd';
import { TodoContext } from './todocontext';
import './todolist.css';

const TodoList = () => {
  const [input, setInput] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isRange, setIsRange] = useState(false);
  const [isTimeRange, setIsTimeRange] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const { todos, todayTodos, addTodo, removeTodo } = useContext(TodoContext);

  const handleAddTodo = () => {
    if (input && startDate) {
      const startTimeFormatted = startTime ? startTime.format('HH:mm') : null;
      const endTimeFormatted = endTime ? endTime.format('HH:mm') : null;
      addTodo(input, startDate.format('YYYY-MM-DD'), isRange ? endDate?.format('YYYY-MM-DD') : null, startTimeFormatted, endTimeFormatted);
      setInput('');
      setStartDate(null);
      setEndDate(null);
      setIsRange(false);
      setIsTimeRange(false);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const showModal = (todo) => {
    setSelectedTodo(todo);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    if (selectedTodo) {
      removeTodo(selectedTodo.task);
      setIsModalVisible(false);
    }
  };

  return (
    <div className="todo-container">
      <Card title="Add New Task" className="todo-card">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add a new task" 
          style={{ marginBottom: '10px' }}
        />
        <DatePicker 
          value={startDate} 
          onChange={(date) => setStartDate(date)} 
          style={{ marginBottom: '10px', marginRight: '10px' }}
        />
        {isRange && (
          <DatePicker 
            value={endDate} 
            onChange={(date) => setEndDate(date)} 
            style={{ marginBottom: '10px', marginRight: '10px' }}
            placeholder="End Date"
          />
        )}
        <Checkbox 
          checked={isRange} 
          onChange={(e) => setIsRange(e.target.checked)} 
          style={{ marginBottom: '10px' }}
        >
          Specify a range
        </Checkbox>
        <Checkbox 
          checked={isTimeRange} 
          onChange={(e) => setIsTimeRange(e.target.checked)} 
          style={{ marginBottom: '20px' }}
        >
          Specify a time range
        </Checkbox>
        {isTimeRange && (
          <div style={{ marginBottom: '10px' }}>
            <TimePicker 
              value={startTime} 
              onChange={(time) => setStartTime(time)} 
              placeholder="Start o'clock"
              style={{ marginRight: '10px' }}
            />
            <TimePicker 
              value={endTime} 
              onChange={(time) => setEndTime(time)} 
              placeholder="End o'clock"
            />
          </div>
        )}
        <Button type="primary" onClick={handleAddTodo} style={{ marginBottom: '20px' }}>
          Add
        </Button>
      </Card>
      {todayTodos.length > 0 && (
        <Card title="Today's Tasks" className="todo-card">
          <List
            bordered
            dataSource={todayTodos}
            renderItem={item => (
              <List.Item onClick={() => showModal(item)}>
                {item.task} - <span style={{ color: 'gray' }}>{item.date}</span>
                {item.endDate && <> to <span style={{ color: 'gray' }}>{item.endDate}</span></>}
                {item.startTime && <> from <span style={{ color: 'gray' }}>{item.startTime}</span></>}
                {item.endTime && <> to <span style={{ color: 'gray' }}>{item.endTime}</span></>}
              </List.Item>
            )}
          />
        </Card>
      )}
      <Card title="To-Do List" className="todo-card">
        <List
          bordered
          dataSource={todos}
          renderItem={item => (
            <List.Item onClick={() => showModal(item)}>
              {item.task} - <span style={{ color: 'gray' }}>{item.date}</span>
              {item.endDate && <> to <span style={{ color: 'gray' }}>{item.endDate}</span></>}
              {item.startTime && <> from <span style={{ color: 'gray' }}>{item.startTime}</span></>}
              {item.endTime && <> to <span style={{ color: 'gray' }}>{item.endTime}</span></>}
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="Todo Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        {selectedTodo && (
          <div>
            <p><strong>Task:</strong> {selectedTodo.task}</p>
            <p><strong>Date:</strong> {selectedTodo.date}</p>
            {selectedTodo.endDate && <p><strong>End Date:</strong> {selectedTodo.endDate}</p>}
            {selectedTodo.startTime && <p><strong>Start Time:</strong> {selectedTodo.startTime}</p>}
            {selectedTodo.endTime && <p><strong>End Time:</strong> {selectedTodo.endTime}</p>}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TodoList;
