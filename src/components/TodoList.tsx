// import React from "react";
// import { useQuery, gql } from "@apollo/client";
// import TodoItem from "./TodoItem";
// import Heading from "./Heading";

// const GET_TODOS = gql`
//   query GetTodos {
//     todos {
//       id
//       description
//     }
//   }
// `;

// export interface Todo {
//   id: string;
//   description: string;
//   completed: boolean;
// }

// const TodoList: React.FC = () => {
//   const { loading, error, data } = useQuery(GET_TODOS);
//   console.log(data);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :</p>;

//   return (
//     <>
//       <Heading />
//       <div className="flex items-center justify-center flex-col m-9 ">
//         <div className="container">
//           <div>
//             {data.todos.map((todo: Todo) => (
//               <div
//                 key={todo.id}
//                 className="flex items-center justify-between mb-6 shadow-md shadow-stone-400 border-2 border-stone-200 bg-white rounded-lg mx-auto w-full md:w-[75%]"
//               >
//                 <TodoItem todo={todo} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TodoList;

import { useQuery, useMutation, gql } from "@apollo/client";
import { useEffect } from "react";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      id
      completed
    }
  }
`;

function TodoList() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [updateTodo] = useMutation(UPDATE_TODO);

  useEffect(() => {
    if (data) {
      localStorage.setItem("todos", JSON.stringify(data.todos));
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.todos.map((id: string, title: string, completed: boolean) => (
        <li key={id}>
          <input
            type="checkbox"
            checked={completed}
            onChange={() =>
              updateTodo({ variables: { id, completed: !completed } })
            }
          />
          {title}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
