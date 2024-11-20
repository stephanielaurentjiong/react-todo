import * as React from "react";
import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";

function App() {
  const [newTodo, setNewTodo] = React.useState("");

  return (
    <>
      <h1>Todo List</h1>
      <TodoList />
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
    </>
  );
}

export default App;
