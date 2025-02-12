/* eslint-disable react/prop-types */
import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";
import PropTypes from 'prop-types'; // ES6

/**
 * Component for adding a new todo item.
 *
 * @param props.onAddTodo - Callback function to add a new todo.
 *                                      Receives an object with the todo's title and id.
 * @returns {JSX.Element} The AddTodoForm component.
 */
function AddTodoForm({ onAddTodo }) {
  // Create a new state variable `todoTitle` to store the input value.
  const [todoTitle, setTodoTitle] = React.useState("");

  /**
   * Handles changes to the input field.
   * Updates the `todoTitle` state with the current value entered by the user.
   *
   * @param event The event object triggered by the input field.
   */
  const handleTitleChange = (event) => {
    // Retrieve the input value from the event object.
    const newTodoTitle = event.target.value;

    // Update the `todoTitle` state with the new value.
    setTodoTitle(newTodoTitle);
  };

  /**
   * Handle form submission.
   *
   * @param {*} event
   */
  const handleAddTodo = async (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Trim the title to remove extra spaces.
    const newTodoTitle = todoTitle.trim();

    // Check if the title is not empty.
    if (newTodoTitle) {
      await onAddTodo(newTodoTitle); // Pass the title to the parent function for API handling.
      setTodoTitle(""); // Clear the input field after submission.
    } else {
      console.error("Todo title cannot be empty");
    }
  };

  return (
    <>
      <form onSubmit={handleAddTodo} className={styles.addTodoContainer}>
        <label className={styles.addTodoLabel}> Add Todo:</label>
        <InputWithLabel
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
          className={styles.addTodoInput} 
        />
        <button className={styles.addTodoButton}>Add</button>
      </form>
    </>
  );
}
// Define PropTypes for AddTodoForm
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired, // Ensures onAddTodo is a required function
};
export default AddTodoForm;
