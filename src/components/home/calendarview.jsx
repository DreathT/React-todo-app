import React, { useContext, useState } from 'react';
import { Calendar, Badge, Modal, Button, Tag } from 'antd';
import { TodoContext } from './todocontext';
import moment from 'moment';
import './calendarview.css';

const CalendarView = () => {
  const { todos } = useContext(TodoContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [todosForSelectedDate, setTodosForSelectedDate] = useState([]);

  const dateCellRender = (value) => {
    const currentDate = value.format('YYYY-MM-DD');
    const listData = todos.filter(todo => {
      if (todo.endDate) {
        return moment(currentDate).isBetween(todo.date, todo.endDate, null, '[]');
      }
      return todo.date === currentDate;
    });

    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status="success" text={item.task} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect = (value) => {
    const currentDate = value.format('YYYY-MM-DD');
    const listData = todos.filter(todo => {
      if (todo.endDate) {
        return moment(currentDate).isBetween(todo.date, todo.endDate, null, '[]');
      }
      return todo.date === currentDate;
    });
    setSelectedDate(currentDate);
    setTodosForSelectedDate(listData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isToday = (date) => {
    return moment(date).isSame(moment(), 'day');
  };

  return (
    <div className="calendar-view">
      <Calendar dateCellRender={dateCellRender} onSelect={onSelect} />
      
      <Modal
        title={`Todos for ${selectedDate}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        {todosForSelectedDate.length > 0 ? (
          <ul>
            {todosForSelectedDate.map((todo, index) => (
              <li key={index}>
                <p><strong>Task:</strong> {todo.task}</p>
                <p><strong>Date:</strong> {todo.date}</p>
                {todo.endDate && <p><strong>End Date:</strong> {todo.endDate}</p>}
                {todo.startTime && <p><strong>Start Time:</strong> {todo.startTime}</p>}
                {todo.endTime && <p><strong>End Time:</strong> {todo.endTime}</p>}
                {isToday(todo.date) && <Tag color="red">Zorunlu</Tag>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No todos for this date.</p>
        )}
      </Modal>
    </div>
  );
}

export default CalendarView;
