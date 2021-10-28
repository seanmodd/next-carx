import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import client from 'src/__graphql/apolloClient';
import { GET_ALL_VARIANTS } from 'src/__graphql/queries';
import { useRouter } from 'next/router';
import DashboardLayout from 'src/layouts/dashboard';
import { useState, useEffect } from 'react';

function SingleCar() {
  const router = useRouter();
  console.log('🚀 ~ file: [id].js ~ line 6 ~ SingleCar ~ router', router);
  const { id } = router.query;
  console.log(
    '🚀 ~ file: [id].js ~ line 7 ~ SingleCar ~ router.query',
    router.query
  );
  console.log('🚀 ~ file: [id].js ~ line 7 ~ SingleCar ~ pid', id);

  // useEffect(() => {
  //   console.log(id);
  //   if (!id) return;
  //   client
  //     .query({
  //       query: GET_ALL_VARIANTS,
  //       variables: { id },
  //     })
  //     .then((res) => {
  //       console.log('🚀 ~ file: [id].js ~ line 28 ~ .then ~ res', res);
  //       console.log(res);
  //       setData(res.data);
  //     });
  // }, [id]);

  const { loading, error, data } = useQuery(GET_ALL_VARIANTS, {
    variables: { id },
  });
  console.log('🚀 ~ file: [id].js ~ line 35 ~ SingleCar ~ data', data);

  return (
    <>
      <DashboardLayout>
        <div>
          <h1>Single Car {id}</h1>
        </div>
      </DashboardLayout>
    </>
  );
}

export default SingleCar;
// watch here: https://www.youtube.com/watch?v=oUZLx79AN1A&t=970s

// export async function getStaticProps({ params }) {
//   const id = params.id[0];
//   console.log(
//     '🚀 ~ file: [id].js ~ line 24 ~ getStaticProps ~ params',
//     params
//   );
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: GET_ALL_VARIANTS,
//     variables: { id },
//   });
//   return {
//     props: { initialApolloState: apolloClient.cache.extract(), id },
//   };

//   // const { data } = await client.query({
//   //   query: gql`
//   //     query Variants {
//   //       variants {
//   //         id
//   //         qty
//   //         # color
//   //         size
//   //         style
//   //         price
//   //         product {
//   //           id
//   //           name
//   //           category {
//   //             id
//   //             name
//   //             description
//   //           }
//   //           promo
//   //           featured
//   //           description
//   //         }
//   //         images {
//   //           id
//   //           url
//   //           height
//   //           width
//   //           name
//   //         }
//   //       }
//   //     }
//   //   `,
//   //   variables: { id },
//   // });
//   // const { variants } = data;
//   // const variant = variants[0];
//   // console.log(
//   //   '🚀 ~ file: [id].js ~ line 73 ~ getStaticProps ~ variants',
//   //   variants
//   // );
//   // return {
//   //   props: {
//   //     // pid: params.pid,
//   //     props: { variant },
//   //   },
//   // };
// }
