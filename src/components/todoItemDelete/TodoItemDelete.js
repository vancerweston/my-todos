import React from 'react';
import PubSub from 'pubsub-js';
import './TodoItemDelete.css';
import {TODO_ITEM_DELETED} from '../../lib/subscriptions';
import {API_BASE_URL} from '../../lib/config';
import axios from 'axios';
import {FaTrash} from 'react-icons/fa';

axios.defaults.baseURL = API_BASE_URL;

class TodoItemDelete extends React.Component {
    constructor(props) {
        super(props);
        
        //Binding custom component methods
        this.deleteHandler = this.deleteHandler.bind(this);

    }

    deleteHandler() {
        console.log('Hey you deleted me.', this.props.id);

        axios.delete(`todos/${this.props.id}`)
            .then((res) => {
                PubSub.publish(TODO_ITEM_DELETED, res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className='todo-item-img'>
                <FaTrash onClick={this.deleteHandler} alt='Delete' />
            </div>
        )
    }
}

export default TodoItemDelete;
