import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apollo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <TodoList />
      </ApolloProvider>
    </>
  );
}

export default App;
