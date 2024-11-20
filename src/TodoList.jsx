import TodoListItem from "./TodoListItem.jsx";

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

const TodoList = () => {
  return (
    <>
      <ul>
        {todolist.map(function (list) {
          return (
            <TodoListItem key={list.id} todo={list} />
          )
        })}
      </ul>
    </>
  );
}

export default TodoList;
