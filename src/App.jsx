import * as React from "react";
import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";

/**
 *
 * This component manages the todo list state and handles adding new todos.
 * It renders the `TodoList` and `AddTodoForm` components, passing necessary props.
 *
 */
function App() {
  //Create state variable with inital value empty array
  const [todoList, setTodoList] = React.useState([]);

  /**
   * Add a new todo item to the todo list.
   *
   * @param {*} newTodo new todo title from user input
   */
  const addTodo = (newTodo) => {
    // Update the state with the new todo added to the existing list.
    setTodoList([...todoList, newTodo]);
  };

  return (
    <>
      <h1>Todo List</h1>

      {/* Render TodoList component and pass todoList function as a todoList prop */}
      <TodoList todoList={todoList} />

      {/* Render the AddTodoForm component and pass the addTodo function as the onAddTodo prop */}
      <AddTodoForm onAddTodo={addTodo} />
    </>
  );
}

export default App;
