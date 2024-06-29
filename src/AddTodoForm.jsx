import React from "react";

function AddTodoForm (props) {
    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value; //Retrieve input value using event.target.title.value
        console.log(todoTitle);
        event.target.reset();
        props.onAddTodo(todoTitle);
        
    }; 
    return (
        <div>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todoTitle">Title </label>
                <input type="text" id="todoTitle" name="title" />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddTodoForm;
