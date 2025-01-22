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

  // Create state variable to track whether the initial fetch is in progress
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async() => {

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.title,
      }));
   
      setTodoList(todos);
      setIsLoading(false);
      
    } catch (error){
      console.log(error.message);
    }
  }

  // Side effect to load the saved todo list from Airtable
  React.useEffect(() => {
    fetchData();
  }, []);


  // Side-effect to save the todo list to `localStorage` whenever it changes.
  React.useEffect(() => {
    // Ensure `localStorage` is updated only after the initial fetch is complete
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));  
    }
  }, [todoList]);

  /**
   * Add a new todo item to the Airtable API and update the list only on success.
   *
   * @param {string} newTodoTitle The title of the new todo.
   */
  const addTodo = async (newTodoTitle) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodoTitle,
        },
      }),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      const newTodo = {
        id: data.id,
        title: data.fields.title,
      };

      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(`Failed to add todo: ${error.message}`);
    }
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
        // If the `isLoading` state is true (fetching in progress), display a loading message
        <p>Loading</p>
      ) : (
        // If `isLoading` is false (fetching complete), render the `TodoList` component with the fetched `todoList` data
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}

      {/* Render the AddTodoForm component and pass the addTodo function as the onAddTodo prop */}
      <AddTodoForm onAddTodo={addTodo} />
    </>
  );
}

export default App;
