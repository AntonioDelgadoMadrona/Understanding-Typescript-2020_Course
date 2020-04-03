import React, { useState } from 'react';
import { Todo } from './todo.models';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

const App: React.FC = props => {

  const [todos, setTodos] = useState<Todo[]>([]);

  // const todos = [{ id: 't1', text: 'Finish the course' }];

  const todoAdHandler = (text: string) => {
    setTodos(prevState => ([...prevState, { id: Math.random().toString(), text }]));
    console.log(text);
  };

  const todoDeleteHandler = (id: string) => {
    let newCollection = [...todos];
    newCollection = newCollection.filter(todo => todo.id !== id);
    setTodos(newCollection);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAdHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
}

export default App;
