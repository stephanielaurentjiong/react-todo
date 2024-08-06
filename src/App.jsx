import * as React from "react";
import TodoList from "./TodoList.jsx";
import AddTodoForm from "./AddTodoForm.jsx";

function App() {
  const [todoList, setTodoList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTodoList = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            todoList: JSON.parse(localStorage.getItem("savedTodoList")) || [],
          },
        }); //resolve is a callback function when the Promise is successful
      }, 2000);
    });

    fetchTodoList
      .then((result) => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetch data: ", error);
      });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };
  return (
    <>
      <h1>Todo List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}

      <AddTodoForm onAddTodo={addTodo} />
    </>
  );
}

export default App;
