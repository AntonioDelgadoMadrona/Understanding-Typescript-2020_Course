import React from 'react';

import './TodoList.css';

interface TodoListProps {
    items: { id: string, text: string }[];
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FunctionComponent<TodoListProps> = props => {

    const { items, onDeleteTodo } = props;

    return (
        <ul>
            {items.map(todo => {
                return (
                    <li key={todo.id}>
                        <span>{todo.text}</span>
                        <button onClick={() => onDeleteTodo(todo.id)}>DELETE</button>
                    </li>
                )
            })}
        </ul>
    )
};

export default TodoList;