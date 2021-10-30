import { useContext } from 'react';
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import SettingsPortal from 'src/__gatsby/settings/SettingsPortal';
import AuthPortal from 'src/__gatsby/auth/AuthPortal';
import Layout from 'src/__gatsby/ui/layout';
import Link from 'next/link';
import { UserContext } from 'src/__gatsby/contexts';
import { setUser } from 'src/__gatsby/contexts/actions';
import { useIsClient } from 'src/__gatsby/hooks';

// ----------------------------------------------------------------------

export default function AccountPage() {
  const { themeStretch } = useSettings();
  const { user } = useContext(UserContext);
  const { isClient, key } = useIsClient();

  if (!isClient) return null;

  return (
    <DashboardLayout>
      <Page title="Account Page | CarX">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h3" component="h1" paragraph>
            Page Four
          </Typography>
          <Layout key={key}>
            {user.jwt && user.onboarding ? null : (
              <Link href="/dashboard/app/account">
                <h1>Account</h1>
              </Link>
            )}

            {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
          </Layout>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
