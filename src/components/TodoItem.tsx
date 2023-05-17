import React from "react";
import { Todo } from "./ToDoList";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="p-4">
      <div className="text-xl">{todo.description}</div>
    </div>
  );
};

export default TodoItem;
