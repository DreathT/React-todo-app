import React, { createContext, useState, useEffect } from 'react';
import moment from 'moment';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);

  const addTodo = (task, date, endDate = null, startTime = null, endTime = null) => {
    setTodos([...todos, { task, date, endDate, startTime, endTime }]);
  };

  const removeTodo = (taskToRemove) => {
    setTodos(todos.filter(todo => todo.task !== taskToRemove));
  };

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    const filteredTodos = todos.filter(todo => {
      if (todo.endDate) {
        return moment(today).isBetween(todo.date, todo.endDate, null, '[]');
      }
      return todo.date === today;
    });
    setTodayTodos(filteredTodos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, todayTodos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
