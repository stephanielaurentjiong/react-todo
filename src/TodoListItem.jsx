import React from 'react';

function TodoListItem(props) {
    return (
        <li>{props.todo.title}</li> //Access props.todo.title to display the title
    )
}

export default TodoListItem;