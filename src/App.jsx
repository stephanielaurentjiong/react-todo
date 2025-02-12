import * as React from "react";
import "./App.css";
import TodoList from "./components/TodoList.jsx";
import AddTodoForm from "./components/AddTodoForm.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 *
 * This component manages the todo list state and handles adding new todos.
 * It renders the `TodoList` and `AddTodoForm` components, passing necessary props.
 *
 */
function App() {
  // Create state variables
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState("asc"); // Default: ascending order

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    // Fetch sorted data from Airtable
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?sort[0][field]=title&sort[0][direction]=${sortOrder}`;

    try {
      const response = await fetch(url, options);

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
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch data when component mounts or when sortOrder changes
  React.useEffect(() => {
    fetchData();
  }, [sortOrder]);

  // Save to localStorage when todoList updates
  React.useEffect(() => {
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
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;
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

      // Add new task and sort the list immediately
      setTodoList((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];

        return updatedTodos.sort((a, b) => {
          return sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        });
      });
    } catch (error) {
      console.log(`Failed to add todo: ${error.message}`);
    }
  };

  const removeTodo = async (id) => {
     const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Failed to delete todo: ${response.status}`);
    }

    // ✅ If the deletion was successful, remove the todo from state
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  } catch (error) {
    console.error(error.message);
  }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <button
               
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Toggle Sort Order ({sortOrder === "asc" ? "A-Z" : "Z-A"})
              </button>

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}

              <AddTodoForm onAddTodo={addTodo} />
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
