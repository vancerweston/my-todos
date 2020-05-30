import React from 'react';
import PubSub from 'pubsub-js';
import {TODO_ITEM_CREATED} from '../../lib/subscriptions';
import {API_BASE_URL} from '../../lib/config';


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

        fetch(API_BASE_URL + 'todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((res) => {
                res.json()
                    .then((json_body) => {
                        PubSub.publish(TODO_ITEM_CREATED, json_body);

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
            })
            .catch((err) => {
            console.log(err);
            });
    }

    render() {
        return (
            <div className='todo-item-create'>
                <div><input type='text' ref={this.nameInput} defaultValue={null} placeholder='Create Your Todo Name' /></div>
                <div><input type='text' ref={this.descriptionInput} defaultValue={null} placeholder='Create Your Todo Description' /></div>
                <button ref={this.submitButton}>Submit</button>
            </div>
        );
    }
}

export default TodoItemCreate;