import React from 'react';
import PubSub from 'pubsub-js';
import './TodoItemCreate.css'
import {TODO_ITEM_CREATED} from '../../lib/subscriptions';
import {API_BASE_URL} from '../../lib/config';
import axios from 'axios';

axios.defaults.baseURL = API_BASE_URL;


class TodoItemCreate extends React.Component {
    constructor(props) {
        super(props); //super passes props to React.Component

        this.state = {
            name: null,
            description: null,
            complete: false
        }
        
        //Binding custom component methods
        this.submitHandler = this.submitHandler.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);

        //Getting references to JSX elements
        this.submitButton = React.createRef();
        this.nameInput = React.createRef();
        this.descriptionInput = React.createRef();
    }

    componentDidMount() {
        console.log('EVENT Fired: componentDidMount');

        //Attach event handlers to referenced element to synthetic events
        this.nameInput.current.addEventListener('change', this.nameChangeHandler);
        this.descriptionInput.current.addEventListener('change', this.descriptionChangeHandler);
        this.submitButton.current.addEventListener('click', this.submitHandler);
    }

    componentWillUnmount() {
        console.log('EVENT Fired: componentWillUnmount');
    }

    componentDidCatch(err, info) {
        this.setState({
            err,
            info
        })
    }

    // Custom component event handlers
    nameChangeHandler(e) {

        this.setState({
            name: e.target.value
        });
    }

    descriptionChangeHandler(e) {

        this.setState({
            description: e.target.value
        })
    }

    submitHandler(e) {
        console.log('Hey you clicked me.', this.state);

        axios.post('todos/', this.state)
            .then((res) => {
                PubSub.publish(TODO_ITEM_CREATED, res.data);

                this.nameInput.current.value = null;
                this.descriptionInput.current.value = null;
        
                this.setState({
                    name: null,
                    description: null
                });

                this.props.refreshToDo();
            })
            .catch((err) => {
            console.log(err);
            });
    }

    render() {
        return (
            <div className='todo-item-create'>
                <div>
                    <input className='todo-item-input' type='text' ref={this.nameInput} defaultValue={null} placeholder='Create Your Todo Name' />
                </div>
                <div>
                    <input className='todo-item-input' type='text' ref={this.descriptionInput} defaultValue={null} placeholder='Create Your Todo Description' />
                </div>
                <div>
                    <button className='todo-item-button' ref={this.submitButton}>Create Todo</button>
                </div>
            </div>
        );
    }
}

export default TodoItemCreate;