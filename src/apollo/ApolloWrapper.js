import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "src/apollo/client"

export const ApolloWrapper = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
