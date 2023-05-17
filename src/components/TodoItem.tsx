// import React, { useState, useEffect } from "react";
// import { Todo } from "./TodoList";

// interface TodoItemProps {
//   todo: Todo;
// }

// const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
//   const initialState = JSON.parse(localStorage.getItem(todo.id) || "false");
//   const [completed, setCompleted] = useState(initialState);

//   useEffect(() => {
//     localStorage.setItem(todo.id, JSON.stringify(completed));
//   }, [completed, todo.id]);

//   const handleClick = () => {
//     setCompleted(!completed);
//   };

//   return (
//     <div
//       className="flex items-center p-4 gap-4  "
//       style={{ cursor: "pointer" }}
//     >
//       <button
//         className={`h-6 w-6 rounded-full border-2 flex-shrink-0 ${
//           completed ? "border-[#D1A1B5] bg-[#E8B7CB]" : "border-gray-300"
//         }`}
//         onClick={handleClick}
//       />
//       <div
//         className={`ml-4 text-md ${completed ? "opacity-50" : ""}`}
//         onClick={handleClick}
//       >
//         {todo.description}
//       </div>
//     </div>
//   );
// };

// export default TodoItem;
import React, { useState, useEffect } from "react";
import { Todo } from "./TodoList";
import { useMutation, gql } from "@apollo/client";

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

interface TodoItemProps {
  todo: Todo;
  refetch: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, refetch }) => {
  const localStorageKey = `todo-${todo.id}-completed`;
  const completedFromLocalStorage =
    localStorage.getItem(localStorageKey) === "true";
  const [completed, setCompleted] = useState(completedFromLocalStorage);
  const [updateTodo, { loading, error }] = useMutation(UPDATE_TODO);

  useEffect(() => {
    localStorage.setItem(localStorageKey, String(completed));
  }, [completed, localStorageKey]);

  const handleClick = async () => {
    setCompleted(!completed);
    await updateTodo({
      variables: { id: todo.id, completed: !completed },
    });
    refetch();
  };

  if (loading) return <p>Updating...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="flex items-center p-4 gap-4" style={{ cursor: "pointer" }}>
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
