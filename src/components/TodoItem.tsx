import React, { useState, useEffect } from "react";
import { Todo } from "./TodoList";
import { BsCheckLg } from "react-icons/bs";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const initialState = JSON.parse(localStorage.getItem(todo.id) || "false");
  const [completed, setCompleted] = useState(initialState);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem(todo.id, JSON.stringify(completed));
    if (completed) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [completed, todo.id]);

  const handleClick = () => {
    setCompleted(!completed);
  };

  return (
    <>
      <div
        className="flex items-center p-4 gap-4  "
        style={{ cursor: "pointer" }}
      >
        <button
          className={`flex items-center justify-center h-8 w-8 rounded-full border-2 flex-shrink-0 ${
            completed ? "border-[#D1A1B5] bg-[#E8B7CB]" : "border-gray-300"
          }`}
          onClick={handleClick}
        >
          {completed && <BsCheckLg className="text-white" />}
        </button>

        <div
          className={`ml-4 text-md mx-auto w-full ${
            completed ? "opacity-50 line-through decoration-1" : ""
          }`}
          onClick={handleClick}
        >
          {todo.description}
        </div>
      </div>
      {showToast && (
        <div
          id="toast-success"
          className=" fixed inline-flex top-0 left-0 max-w-xs p-4 mt-4 ml-4 text-black bg-white rounded-lg shadow-md"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0">
            <p>👏</p>
          </div>
          <div className="inline-flex items-center justify-center ml-2 mt-1 text-sm font-normal">
            GG !
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
