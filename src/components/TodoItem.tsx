import React, { useState } from "react";
import { Todo } from "./TodoList";
import { useMutation, gql } from "@apollo/client";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const handleClick = () => {
    setCompleted(!completed);
  };

  return (
    <div
      className="flex items-center p-4 gap-4  "
      style={{ cursor: "pointer" }}
    >
      <button
        className={`h-6 w-6 rounded-full border-2 flex-shrink-0 ${
          completed ? "border-[#D1A1B5] bg-[#E8B7CB]" : "border-gray-300"
        }`}
        onClick={handleClick}
      />
      <div
        className={`ml-4 text-md ${completed ? "opacity-50" : ""}`}
        onClick={handleClick}
      >
        {todo.description}
      </div>
    </div>
  );
};

export default TodoItem;
