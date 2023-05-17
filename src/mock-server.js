import { ApolloServer, gql } from "apollo-server";
const typeDefs = gql`
  type Todo {
    id: ID!
    description: String!
  }

  type Query {
    todos: [Todo!]!
  }
`;

const server = new ApolloServer({
  typeDefs,
  mocks: true,
  cors: {
    origin: "*", // Permet à toutes les origines d'accéder à votre serveur
    credentials: true,
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
