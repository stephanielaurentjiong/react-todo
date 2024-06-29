import React from 'react';
import TodoListItem from './TodoListItem';

let todoList = [
    {
      id: 123,
      title: "Complete React Week1"
    },
    {
      id: 213,
      title: "Complete Node Week1"
    },
    {
      id: 321,
      title: "Complete Intro Week1"
    }
  ]
  

function TodoList() {
    return (
        <div>
            <ul>
                {todoList.map = (item) => {
                    return (
                      <TodoListItem key={item.id} todo={item} /> //Pass key and todo as props to TodoListItem
                    )
                }}
            </ul>
        </div>
    )
}

export default TodoList;