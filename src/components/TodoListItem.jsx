/* eslint-disable react/prop-types */
import styles from "./TodoListItem.module.css";
import PropTypes from "prop-types"; // ES6

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

// Define PropTypes for TodoListItem
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID can be a string or number
    title: PropTypes.string.isRequired, // Title must be a string
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired, // onRemoveTodo must be a function
};

export default TodoListItem;
