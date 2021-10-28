import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from 'src/__graphql/apolloClient';
// import { client } from "src/__apollo/client"

export const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
