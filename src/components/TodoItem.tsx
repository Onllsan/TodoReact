import React, { useState, useEffect } from "react";
import { Todo } from "./TodoList";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const initialState = JSON.parse(localStorage.getItem(todo.id) || "false");
  const [completed, setCompleted] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(todo.id, JSON.stringify(completed));
  }, [completed, todo.id]);

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
