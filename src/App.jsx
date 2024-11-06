import "./App.css";

const todolist = [
  {
    id: 123,
    title: "react",
  },
  {
    id: 345,
    title: "python",
  },
  {
    id: 678,
    title: "java",
  },
];

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todolist.map(function (list) {
          return <li key={list.id}>{list.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
