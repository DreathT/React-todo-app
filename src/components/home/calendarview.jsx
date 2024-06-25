import React, { useContext } from 'react';
import { Calendar, Badge } from 'antd';
import { TodoContext } from './todocontext';
import './calendarview.css';
import moment from 'moment';

const CalendarView = () => {
  const { todos } = useContext(TodoContext);

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

  return (
    <div className="calendar-view">
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
}

export default CalendarView;
