import React from 'react';
import '../node_modules/bulma/css/bulma.css'
import './App.css';
import PubSub from 'pubsub-js';
import {TODO_ITEM_CREATED} from './lib/subscriptions';
import {API_BASE_URL} from './lib/config';

//NOTE: Importing local application components
import TodoList from './components/todoList/TodoList'
import TodoItemCreate from './components/todoItemCreate/TodoItemCreate'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_items: []
    }

    this.getTodoList = this.getTodoList.bind(this);

    this.todoItemCreatedHandler = this.todoItemCreatedHandler.bind(this);
    PubSub.subscribe(TODO_ITEM_CREATED, this.todoItemCreatedHandler);
  }

  componentDidMount() {
   this.getTodoList();
  }
  
  getTodoList() {
    fetch(API_BASE_URL + 'todos/')
      .then((res) => {
        res.json()
          .then((json_body) => {
            this.setState({
              todo_items: json_body
            });    
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Notification Handlers
  todoItemCreatedHandler(msg, data) {
    console.log(data);
    this.state.todo_items.push(data);
    this.setState({
      todo_items: this.state.todo_items
    })
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
