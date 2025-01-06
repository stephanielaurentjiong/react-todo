/* eslint-disable react/prop-types */
function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <>
      <li>{todo.title}</li>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </>
  );
}

export default TodoListItem;
