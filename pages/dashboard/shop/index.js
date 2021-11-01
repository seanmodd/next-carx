import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { filter, includes, orderBy } from 'lodash';
// material
import {
  Backdrop,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Skeleton,
  Divider,
  Grid,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from 'src/___redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  getProducts,
  // getAllProductGraphQl,
  filterProducts,
} from 'src/___redux/slices/product';
// routes
// utils
import fakeRequest from 'src/utils/fakeRequest';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
// import Page from 'src/minimalComponents/Page';
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
} from 'src/minimalComponents/_dashboard/e-commerce/shop';
import CartWidget from 'src/minimalComponents/_dashboard/e-commerce/CartWidget';
import DashboardLayout from 'src/layouts/dashboard';
import AuthLayout from 'src/layouts/AuthLayout';
import GuestGuard from 'src/guards/GuestGuard';

//* All data here comes from src/___redux/slices/product.js lines 220+ where the getProducts function is being exported!
//* This then calls an api with Axios which is referencing to localhost:3222/api/products which itself gets data from the graphql server on https://admin.shopcarx.com/graphql which comes back and retrieves data via a graphql setup
// ----------------------------------------------------------------------

function applyFilter(products, sortBy, filters) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['price'], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['price'], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = filter(products, (_product) =>
      includes(filters.gender, _product.gender)
    );
  }
  if (filters.category !== 'All') {
    products = filter(
      products,
      (_product) => _product.category === filters.category
    );
  }
  if (filters.colors.length > 0) {
    products = filter(products, (_product) =>
      _product.colors.some((color) => filters.colors.includes(color))
    );
  }
  if (filters.priceRange) {
    products = filter(products, (_product) => {
      if (filters.priceRange === 'below') {
        return _product.price < 25000;
      }
      if (filters.priceRange === 'between') {
        return _product.price >= 25000 && _product.price <= 75000;
      }
      return _product.price > 75000;
    });
  }
  if (filters.rating) {
    products = filter(products, (_product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return _product.totalRating > convertRating(filters.rating);
    });
  }
  return products;
}

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function EcommerceShop() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const myselector = useSelector((state) => state.product);
  const { products, sortBy, filters } = useSelector((state) => state.product);
  console.log(
    '🚀 ~ file: index.js ~ line 101 ~ EcommerceShop ~ selector',
    myselector
  );
  const filteredProducts = applyFilter(products, sortBy, filters);

  const formik = useFormik({
    initialValues: {
      gender: filters.gender,
      category: filters.category,
      colors: filters.colors,
      priceRange: filters.priceRange,
      rating: filters.rating,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await fakeRequest(500);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { values, resetForm, handleSubmit, isSubmitting, initialValues } =
    formik;

  const isDefault =
    !values.priceRange &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  useEffect(() => {
    // dispatch(getProducts());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <GuestGuard>
      <DashboardLayout>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 0, mt: 0, px: 15 }}
        >
          <CartWidget />
        </Stack>
        {/* {!filteredProducts && SkeletonLoad} */}
        <GuestGuard>
          {/* <AuthLayout> */}
          <Page title="Ecommerce: Shop | Minimal-UI">
            {values && (
              <Backdrop open={isSubmitting} sx={{ zIndex: 9999 }}>
                <CircularProgress />
              </Backdrop>
            )}

            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="Shop - All Vehicles"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  // {
                  //   name: 'E-Commerce',
                  //   href: PATH_DASHBOARD.shop.root,
                  // },
                  { name: 'All Vehciles' },
                ]}
              />

              {!isDefault && (
                <Typography gutterBottom>
                  <Typography component="span" variant="subtitle1">
                    {filteredProducts.length}
                  </Typography>
                  &nbsp;Products found
                </Typography>
              )}

              <Stack
                direction="row"
                flexWrap="wrap-reverse"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
              >
                <ShopTagFiltered
                  filters={filters}
                  formik={formik}
                  isShowReset={openFilter}
                  onResetFilter={handleResetFilter}
                  isDefault={isDefault}
                />

                <Stack
                  direction="row"
                  spacing={1}
                  flexShrink={0}
                  sx={{ my: 1 }}
                >
                  <ShopFilterSidebar
                    formik={formik}
                    isOpenFilter={openFilter}
                    onResetFilter={handleResetFilter}
                    onOpenFilter={handleOpenFilter}
                    onCloseFilter={handleCloseFilter}
                  />
                  <ShopProductSort />
                </Stack>
              </Stack>

              <ShopProductList
                products={filteredProducts}
                isLoad={!filteredProducts && !initialValues}
              />
            </Container>
          </Page>
          {/* </AuthLayout> */}
        </GuestGuard>
      </DashboardLayout>
    </GuestGuard>
  );
}
