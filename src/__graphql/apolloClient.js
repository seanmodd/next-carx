import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log(
  '🚀 ~ file: apolloClient.js ~ line 5 ~ process.env.GATSBY_STRAPI_URL',
  process.env.GATSBY_STRAPI_URL
);
const client = new ApolloClient({
  uri: `${process.env.GATSBY_STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
