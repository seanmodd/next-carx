import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { useRouter } from 'next/router';
import { forwardRef, useEffect, useCallback } from 'react';
// material
import { Box } from '@mui/material';
// utils
import track from '../utils/analytics';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  const { router } = useRouter();
  console.log("🚀 ~ file: Page.js ~ line 15 ~ Page ~ router", router)
  

  console.log(
    '🚀 ~ file: Page.js ~ line 16 ~ Page ~ pathname.asPath is as follows:',
    pathname.asPath
  );
  const sendPageViewEvent = useCallback(() => {
    track.pageview({
      page_path: pathname.asPath,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
