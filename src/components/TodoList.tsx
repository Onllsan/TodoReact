import React from "react";
import { useQuery, gql } from "@apollo/client";
import TodoItem from "./TodoItem";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      description
    }
  }
`;

export interface Todo {
  id: string;
  description: string;
}

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      {data.todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
