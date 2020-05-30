import React from 'react';
import './TodoList.css'
import TodoItemDisplay from '../todoItemDisplay/TodoItemDisplay';


function TodoList(props) {
    const todoComponents = props.todos.map(todo => <TodoItemDisplay key={todo._id} todo={todo}/>)
    
    return (
        <div className='todo-list'>
            {todoComponents}
        </div>
    )
}


export default TodoList;