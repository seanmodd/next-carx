import { useEffect } from 'react';
import PropTypes from 'prop-types';

import checkmarkFill from '@iconify/icons-eva/checkmark-fill';


import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
} from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import Page from 'src/minimalComponents/Page';
import DashboardLayout from 'src/layouts/dashboard';
import Image from 'next/image';
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
import { MHidden } from 'src/minimalComponents/@material-extend';
import { LoginForm } from 'src/minimalComponents/authentication/login';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { ResetPasswordForm } from 'src/minimalComponents/authentication/reset-password';
import { SentIcon } from 'src/assets';
import jwtIcon from '/public/static/auth/ic_jwt.png';
import { useDispatch, useSelector } from 'src/___redux/store';
import { getCart, createBilling } from 'src/___redux/slices/product';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useSettings from 'src/hooks/useSettings';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';

import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress,
} from 'src/minimalComponents/_dashboard/e-commerce/checkout';

import loginIcon from '../../../public/static/illustrations/illustration_login.png';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state) => state.product);
  const { cart, billing, activeStep } = checkout;
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  return (
    <DashboardLayout>
      <Page title="Ecommerce: Checkout | Car X">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Checkout"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'All Vehicles',
                href: '/dashboard/e-commerce/shop',
              },
              { name: 'Checkout' },
            ]}
          />

          <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
            <Grid item xs={12} md={8} sx={{ mb: 5 }}>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<QontoConnector />}
              >
                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={QontoStepIcon}
                      sx={{
                        '& .MuiStepLabel-label': {
                          typography: 'subtitle2',
                          color: 'text.disabled',
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>

          {!isComplete ? (
            <>
              {activeStep === 0 && <CheckoutCart />}
              {activeStep === 1 && <CheckoutBillingAddress />}
              {activeStep === 2 && billing && <CheckoutPayment />}
            </>
          ) : (
            <CheckoutOrderComplete open={isComplete} />
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
}
