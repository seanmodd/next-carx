// mock api
import '../src/_apis_';

// i18n
// import '../src/locales/i18n';

// highlight
// import '../src/utils/highlight';
// read the blog here: https://sunde.dev/blog/Beautify_your_markdown_Nextjs_blog_with_Highlightjs
// scroll bar
import 'simplebar/src/simplebar.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// lightbox
import 'react-image-lightbox/style.css';

// editor
import 'react-quill/dist/quill.snow.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// next
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
// material
import { NoSsr } from '@mui/material';
// contexts
import { SettingsProvider } from 'src/contexts/SettingsContext';
import { CollapseDrawerProvider } from 'src/contexts/CollapseDrawerContext';
// theme
import ThemeConfig from 'src/theme';
import GlobalStyles from 'src/theme/globalStyles';
// utils
import createEmotionCache from 'src/utils/createEmotionCache';
// components
import Settings from 'src/components/settings';
import RtlLayout from 'src/components/RtlLayout';
import ProgressBar from 'src/components/ProgressBar';
import LoadingScreen from 'src/components/LoadingScreen';
import ThemePrimaryColor from 'src/components/ThemePrimaryColor';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  console.log('props: ', props);
  return (
    <SettingsProvider>
      <CollapseDrawerProvider>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>

          <ThemeConfig>
            <ThemePrimaryColor>
              <RtlLayout>
                <NoSsr>
                  <Settings />
                </NoSsr>
                <GlobalStyles />
                <ProgressBar />
                <LoadingScreen />
                <Component {...pageProps} />
              </RtlLayout>
            </ThemePrimaryColor>
          </ThemeConfig>
        </CacheProvider>
      </CollapseDrawerProvider>
    </SettingsProvider>
  );
}
