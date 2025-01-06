/* eslint-disable react/prop-types */
import * as React from "react";
import InputWithLabel from "./InputWithLabel";

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
   * Handle form submission
   *
   * @param {*} event
   */
  const handleAddTodo = (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Call the onAddTodo callback handler with the new todo (title and unique id).
    onAddTodo({ title: todoTitle, id: Date.now() });

    event.target.reset();
  };

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <InputWithLabel 
        todoTitle ={todoTitle} 
        handleTitleChange={handleTitleChange} > 
        TITLE TITLE TITLE:
        </InputWithLabel>
        <button>Add</button>
      </form>
    </>
  );
}

export default AddTodoForm;
