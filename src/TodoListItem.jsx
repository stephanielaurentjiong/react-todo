/* eslint-disable react/prop-types */
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <>
      <li className={styles.ListItem}>{todo.title}</li>
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>
        Remove
      </button>
    </>
  );
}

export default TodoListItem;
