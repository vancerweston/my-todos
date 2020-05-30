import React from 'react';
import './TodoItemDisplay.css'

function TodoItemDisplay(props) {


    let showDescription = true;

    const {name, description, complete} = props.todo;

    if(complete) {
        return null;
    } 

    return (
        <div className='todo_item_display'>
            <span className='has-text-primary'>{name}</span>
            {showDescription ? description : null}
            <img src='#' />
        </div>
    );
}

export default TodoItemDisplay;