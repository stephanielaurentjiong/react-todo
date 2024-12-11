import * as React from "react";
import "./App.css";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";

/**
 * Custom hook to manage a semi-persistent state for the todo list.
 *
 * This hook initializes the state with data from `localStorage` if available.
 * Whenever the state changes, the updated state is saved to `localStorage`.
 *
 * @returns {[Array, Function]} An array containing the current todo list and its state updater function.
 */
const useSemiPersistentState = () => {
  //Create state variable with inital value empty array
  const [todoList, setTodoList] = React.useState(
    JSON.parse(localStorage.getItem("savedTodoList")) || []
  );

  // Side-effect to save the todo list to `localStorage` whenever it changes.
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);

  return [todoList, setTodoList];
};

/**
 *
 * This component manages the todo list state and handles adding new todos.
 * It renders the `TodoList` and `AddTodoForm` components, passing necessary props.
 *
 */
function App() {
  // Use the custom hook to manage a semi-persistent todo list state.
  const [todoList, setTodoList] = useSemiPersistentState("");

  /**
   * Add a new todo item to the todo list.
   *
   * @param {*} newTodo new todo title from user input
   */
  const addTodo = (newTodo) => {
    // Update the state with the new todo added to the existing list.
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>

      {/* Render TodoList component and pass todoList function as a todoList prop */}
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />

      {/* Render the AddTodoForm component and pass the addTodo function as the onAddTodo prop */}
      <AddTodoForm onAddTodo={addTodo} />
    </>
  );
}

export default App;
