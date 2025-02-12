/* eslint-disable react/prop-types */
import * as React from "react";
import PropTypes from 'prop-types'; // ES6

/**
 * A component that handles input label
 */
const InputWithLabel = ({ todoTitle, handleTitleChange, children }) => {
  const inputRef = React.useRef();

  // Use the useEffect hook to execute code after the component renders.
  // Focus the input field using the ref to ensure it's ready for user input when the page loads.
  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      {/* Refactor input (component composition usage) */}
      <label htmlFor="todoTitle">{children}</label>
      <input
        ref={inputRef}
        name="title"
        type="text"
        id="todoTitle"
        value={todoTitle} // Pass in the  todoTitle state (which is the given title from user input)
        onChange={handleTitleChange} // Update the state whenever the input value changes.
      ></input>
    </>
  );
};

// Define PropTypes for InputWithLabel
InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired, // Ensures todoTitle is a required string
  handleTitleChange: PropTypes.func.isRequired, // Ensures handleTitleChange is a required function
  children: PropTypes.node.isRequired, // Ensures children is a required node (React element)
};


export default InputWithLabel;
