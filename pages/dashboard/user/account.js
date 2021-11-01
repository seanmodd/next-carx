import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs, Stack } from '@mui/material';

// redux
import { useDispatch } from 'src/___redux/store';
import {
  getCards,
  getProfile,
  getInvoices,
  getAddressBook,
  getNotifications,
} from 'src/___redux/slices/user';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/minimalComponents/Page';
import HeaderBreadcrumbs from 'src/minimalComponents/HeaderBreadcrumbs';
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from 'src/minimalComponents/_dashboard/user/account';
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards());
    dispatch(getAddressBook());
    dispatch(getInvoices());
    dispatch(getNotifications());
    dispatch(getProfile());
  }, [dispatch]);

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'billing',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling />,
    },
    {
      value: 'notifications',
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks />,
    },
    {
      value: 'change_password',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <DashboardLayout>
      <Page title="User: Account Settings | CarX">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Account"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'User', href: PATH_DASHBOARD.user.profile },
              { name: 'Account Settings' },
            ]}
          />

          <Stack spacing={5}>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {ACCOUNT_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={capitalCase(tab.value)}
                  icon={tab.icon}
                  value={tab.value}
                />
              ))}
            </Tabs>

            {ACCOUNT_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Stack>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
