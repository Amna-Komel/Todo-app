import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      value: "",
      editing: false,
      currentid: "",
      currentValue: "",
      // successMessage: null,
    };
  }
// Handle input change for adding a new task
onChange = (e) => {
this.setState({ value: e.target.value });
};
 
// Handle adding a new task to the lis

  onAddTask = (e) => {
    e.preventDefault();
 
// have to make some changings in place of obj

    const obj = {
      name: this.state.value,
      id: Date.now(),
    };
    if (this.state.value !== "") {
      this.setState({ todos: this.state.todos.concat(obj) });
      this.setState({ value: "" });
      alert("Task added successfully!");
    }
  };


//Handle deleting an item from the list

  onDeleteTask = (itemId) => {
   if (window.confirm("Are you sure you want to delete this task?")) {
    this.setState({
      todos: [...this.state.todos].filter((id) => id.id !== itemId),
    });
   }
  };
// Handle editing an item in the list

  onEditTodo = (id, newValue) => {
    this.state.todos.map((todo) => {
      if (todo.id === id) {
        todo.name = newValue;
      }
    });
  };
// Handle submitting the edited item
  onSubmitEditTodo = (e) => {
    e.preventDefault();

    this.onEditTodo(this.state.currentid, this.state.currentValue);
    this.setState({ editing: false });
    alert("Task updated successfully!");
  };

// Toggle editing mode for an item

  onToggleEdit = (todo) => {
    this.setState({ editing: true });
    this.setState({ currentid: todo.id });
    this.setState({ currentValue: todo.name });
  };

// Handle input change for editing an item

  onEditInputChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

// Render the to-do list

  render() {
    const mylist = this.state.todos.map((todo) => (
      <li className="todo_item">
        {todo.name}

        <button onClick={() => this.onToggleEdit(todo)}  className="edit_button">
         {/* <i className="fa fa-pencil"></i> */}
         Edit
         </button>
        <button onClick={() => this.onDeleteTask(todo.id)} className="delete_button">
        {/* <i className="fa-solid fa-trash-can fa-2xl"></i> */}
        Delete
        </button>
      </li>
    ));

    return (
      <>
        <div className="App">
          {this.state.editing === false ? (
            <form onSubmit={this.onAddTask}>
              <input
                placeholder="type your task"
                value={this.state.value}
                onChange={this.onChange}
              />
              <button onClick={this.onAddTask}>Add Item</button>
            </form>
          ) : (
            <form onSubmit={this.onSubmitEditTodo}>
              <input
                placeholder="edit your task"
                value={this.state.currentValue}
                name={this.state.currentValue}
                onChange={this.onEditInputChange}
              />
              <button onClick={this.onSubmitEditTodo}>Update Item</button>
            </form>
          )}

          <ul className="todo_wrapper">{mylist}</ul>
        </div>
      </>
    );
  } 
}

export default App;

