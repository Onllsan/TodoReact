import React, { useState, useEffect } from "react";
import { Todo } from "./TodoList";
import { useMutation, gql } from "@apollo/client";

interface TodoItemProps {
  todo: Todo;
}

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $description: String!, $done: Boolean!) {
    updateTodo(input: { id: $id, description: $description, done: $done }) {
      id
      description
      done
    }
  }
`;

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const initialState = JSON.parse(localStorage.getItem(todo.id) || "false");
  const [updateTodo] = useMutation(UPDATE_TODO);
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
    updateTodo({
      variables: {
        id: todo.id,
        description: todo.description,
        done: !completed,
      },
    });
  };

  return (
    <>
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
          className={`ml-4 text-md mx-auto w-full ${
            completed ? "opacity-50" : ""
          }`}
          onClick={handleClick}
        >
          {todo.description}
        </div>
      </div>
      {showToast && (
        <div
          id="toast-success"
          className="fixed inline-flex top-0 left-0 max-w-xs p-4 mt-4 ml-4 text-black bg-white rounded-lg shadow"
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
