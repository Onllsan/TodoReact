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
  completed: boolean;
}

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div className="flex items-center justify-center flex-col m-9">
      <div className="container">
        <div>
          {data.todos.map((todo: Todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between mb-6 bg-white rounded-md mx-auto w-full md:w-[75%] "
            >
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
