import React from 'react';
import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@mui/material';

import ShopProductCard from './ShopProductCard';
// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(12)].map((_, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: '115%', borderRadius: 2 }}
        />
      </Grid>
    ))}
  </>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  isLoad: PropTypes.bool,
};

export default function ProductList({ products, isLoad, ...other }) {
  console.log('From ShopProductList.js - products props: ', products);
  const newProductList = products[0];
  const productsTwo = { newProductList };
  const productListMap = products.map((product, index) => product.node);

  console.log('From ShopProductList.js - productListMap: ', productListMap);

  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => {
        {
          /* const myproduct = product.node */
        }
        return (
          <Grid item xs={12} sm={6} md={3}>
            <ShopProductCard product={product} />
          </Grid>
        );
      })}

      {isLoad && SkeletonLoad}
    </Grid>
  );
}
