//* Redux
//* This feeds in the redux store useDispatch and useSelector
import React from 'react';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
// import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
import { useRouter } from 'next/router';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Skeleton,
  Container,
  Typography,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useDispatch, useSelector } from 'src/___redux/store';
import DashboardLayout from 'src/layouts/dashboard';
import { getProduct, getProductGraphQl } from 'src/___redux/slices/product';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import Markdown from 'src/minimalComponents/Markdown';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import {
  ProductDetailsSumary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from 'src/minimalComponents/_dashboard/e-commerce/product-details';
import CartWidget from 'src/minimalComponents/_dashboard/e-commerce/CartWidget';

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: roundVerified,
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: clockFill,
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: roundVerifiedUser,
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

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

export default function EcommerceProductDetails(props) {
  console.log(
    '🚀 ~ file: [id].js ~ line 96 ~ EcommerceProductDetails ~ props',
    props
  );
  console.log('From CarDetail.js page, these are the props: ', props);
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const [value, setValue] = useState('1');

  const router = useRouter();
  const { id } = router.query;
  console.log(
    '🚀 🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮🧮  ~ file: [id].js ~ line 112 ~ EcommerceProductDetails ~ id',
    id
  );
  useEffect(() => {
    dispatch(getProductGraphQl(id));
  }, [dispatch, id]);
  console.log(
    '🚀 🎟🎟🎟🎟🎟🎟🎟🎟🎟🎟🎟  ~ file: [id].js ~ line 115 ~ EcommerceProductDetails ~ id',
    id
  );

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const { product, checkout, error } = useSelector((state) => state.product);
  console.log(
    '🚀 ~ file: [id].js ~ line 108 ~ EcommerceProductDetails ~ product',
    product
  );
  console.log('From CarDetail.js page, this is checkout: ', checkout);
  return (
    <DashboardLayout>
      <Page title="Ecommerce: Vehicle Details | Car X">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Vehicle Details"
            links={[
              { name: 'Dashboard', href: '/dashboard' },
              {
                name: 'All Vehicles',
                href: '/dashboard/e-commerce/shop',
              },
              { name },
            ]}
          />

          {/* {product && ( */}
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {/* <ProductDetailsCarousel product={product} /> */}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  {/* <ProductDetailsSumary product={product} checkout={checkout} /> */}
                  {name}
                </Grid>
              </Grid>
            </Card>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={handleChangeTab}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      // label={`Review (${product.reviews.length})`}
                      label="Highlights"
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={name} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  {/* <ProductDetailsReview product={product} /> */}
                  <Grid container sx={{ my: 8 }}>
                    {PRODUCT_DESCRIPTION.map((item) => (
                      <Grid item xs={12} md={4} key={item.title}>
                        <Box
                          sx={{
                            my: 2,
                            mx: 'auto',
                            maxWidth: 280,
                            textAlign: 'center',
                          }}
                        >
                          <IconWrapperStyle>
                            <Icon icon={item.icon} width={36} height={36} />
                          </IconWrapperStyle>
                          <Typography variant="subtitle1" gutterBottom>
                            {item.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {item.description}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              </TabContext>
            </Card>
          </>
          {/* )} */}

          {/* {!product && SkeletonLoad} */}

          {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
        </Container>
      </Page>
    </DashboardLayout>
  );
}
