import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { GET_ALL_VARIANTS } from 'src/__graphql/apolloClient_and_queries';
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
