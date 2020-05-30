import React from 'react';
import './TodoItemDisplay.css';
import TodoItemDelete from '../todoItemDelete/TodoItemDelete';

function TodoItemDisplay(props) {

    const {name, description} = props.todo;

    return (
        <div className='todo_item_display'>
            <div className='todo-item-content'>
                <div className='todo-name'>
                    <span>{name}</span>
                </div>
                <div className='todo-description'>
                    <span>{description}</span>
                </div>
            </div>
            <TodoItemDelete id={props.todo.id} />
        </div>
    );
}

export default TodoItemDisplay;