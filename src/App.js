import React from 'react';
import '../node_modules/bulma/css/bulma.css'
import './App.css';
import PubSub from 'pubsub-js';
import {TODO_ITEM_CREATED, TODO_ITEM_DELETED} from './lib/subscriptions';
import {API_BASE_URL} from './lib/config';
import axios from 'axios';

//NOTE: Importing local application components
import TodoList from './components/todoList/TodoList'
import TodoItemCreate from './components/todoItemCreate/TodoItemCreate'

axios.defaults.baseURL = API_BASE_URL;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_items: []
    }

    this.getTodoList = this.getTodoList.bind(this);

    this.todoItemCreatedHandler = this.todoItemCreatedHandler.bind(this);
    this.todoItemDeletedHandler = this.todoItemDeletedHandler.bind(this);
    PubSub.subscribe(TODO_ITEM_CREATED, this.todoItemCreatedHandler);
    PubSub.subscribe(TODO_ITEM_DELETED, this.todoItemDeletedHandler)
  }

  componentDidMount() {
   this.getTodoList();
  }
  
  getTodoList() {
    axios.get('todos/')
      .then((res) => {
        this.setState({
          todo_items: res.data
        }); 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Notification Handlers
  todoItemCreatedHandler() {
    this.getTodoList();
  }
  
  todoItemDeletedHandler() {
    this.getTodoList();
  }

  render() {
    return (
      <div className="App">
        <TodoList todos={this.state.todo_items} />
        <TodoItemCreate refreshToDo={() => this.getTodoList()} />
      </div>
    );
  }
}

export default App;
