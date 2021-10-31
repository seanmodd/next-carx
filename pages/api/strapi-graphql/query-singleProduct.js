// //! Delete this, not being used!
// import { colors } from '@material-ui/core';
// import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// const client = new ApolloClient({
//   // uri: `http://localhost:1337/graphql`,
//   uri: `https://admin.shopcarx.com/graphql`,
//   cache: new InMemoryCache(),
// });

// //* this file (api/strapi-graphql/products.js) gets referenced from Redux within "src/___redux/slices/product.js"
// export default async (req, res) => {
//   const search = req.body;
//   try {
//     const { data } = await client.query({
//       query: gql`
//         # query Variant($id: id!) {
//         query Variant {
//           # variant(id: $id) {
//           variant {
//             id
//             price
//             car_name
//             product {
//               id
//               name
//               category {
//                 id
//                 name
//                 description
//               }
//               promo
//               featured
//               description
//             }
//             images {
//               id
//               url
//               height
//               width
//               name
//             }
//           }
//         }
//       `,
//     });
//     console.log(
//       '👰~ file: product.js ~ line 49 ~ data.variants',
//       data.variants
//     );

//     res.status(200).json({ products: data.variants, error: null });
//   } catch (error) {
//     console.log('error: ', error);
//     if (error.message === '404: Not Found') {
//       res.status(404).json({ products: null, error: 'No products found' });
//     } else {
//       res.status(500).json({
//         products: null,
//         error: 'Internal Error... gotta try again... or please try again',
//       });
//     }
//   }
// };
