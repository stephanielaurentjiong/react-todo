/* eslint-disable react/prop-types */
import TodoListItem from "./TodoListItem.jsx";
import PropTypes from 'prop-types'; // ES6


/**
 * Functional component to render a list of todo items.
 * 
 * This component takes a `todoList` prop, which is an array of todo objects,
 * and maps over it to render each todo item using the `TodoListItem` component.
 *
 * @param props - The props object passed to the component.
 * @returns props.todoList - An array of todo objects to be displayed.
 *                           Each todo object must have an `id` (unique identifier) and a `title` (string for the todo title).
 */
const TodoList = ({todoList, onRemoveTodo}) => {
  return (
    <>
      <ul>
        {/* Map over the todoList array to render each todo item */}
        {todoList.map(function (item) {
          // Render each todo using the TodoListItem component and provide a unique key
          return <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />;
        })}
      </ul>
    </>
  );
};
// Define PropTypes for InputWithLabel
// Define PropTypes for TodoList
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // ID can be a string or number
      title: PropTypes.string.isRequired, // Title must be a string
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired, // Ensures onRemoveTodo is a required function
};

export default TodoList;
