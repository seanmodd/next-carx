import { colors } from '@material-ui/core';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GATSBY_STRAPI_URL + "/graphql",
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const search = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query Variants {
          # characters(filter: { name: "${search}" }) {
          # variants(filter: { name: "${search}" }) {
            variants(where: {product: {name_contains: "${search}"}}) {
              # variants{
            id
            qty
            # color
            size
            style
            price
            product {
              id
              name
              category {
                id
                name
                description
              }
              promo
              featured
              description
            }
            images {
              id
              url
              height
              width
              name
            }
            
          }
        }
      `,
    });
    console.log(
      '🚀 ~ file: searchvariants.js ~ line 49 ~ data.variants',
      data.variants
    );

    res.status(200).json({ products: data.variants, error: null });
  } catch (error) {
    console.log('error: ', error);
    if (error.message === '404: Not Found') {
      res.status(404).json({ products: null, error: 'No products found' });
    } else {
      res.status(500).json({
        products: null,
        error: 'Internal Error... gotta try again... or please try again',
      });
    }
  }
};
