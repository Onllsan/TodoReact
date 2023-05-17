import React from "react";
import { useQuery, gql } from "@apollo/client";
import TodoItem from "./TodoItem";
import Heading from "./Heading";

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
    <>
      <Heading />
      <div className="flex items-center justify-center flex-col m-9 ">
        <div className="container">
          <div>
            {data.todos.map((todo: Todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-6 shadow-md shadow-stone-400 border-2 border-stone-200 bg-white rounded-lg mx-auto w-full md:w-[75%]"
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
