// mock api
// import '../_MODERN/_apis_'

// i18n
import '../_MODERN/locales/i18n'
// map
import 'mapbox-gl/dist/mapbox-gl.css'

// lightbox
import 'react-image-lightbox/style.css'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/object-fit/ls.object-fit'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import { ChakraProvider, CSSReset, ColorModeProvider } from '@chakra-ui/react'
import 'simplebar/src/simplebar.css'

// editor
import 'react-quill/dist/quill.snow.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

// next

import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
// material
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
// redux
// import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
// material
import { NoSsr } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@mui/material'
import { store, persistor } from '../_MODERN/redux/store'
import ThemeConfig from '../../_SHELL/theme'
import GlobalStyles from '../../_SHELL/theme/globalStyles'
import SEO from './seo'
// utils
import createEmotionCache from '../../_SHELL/utils/createEmotionCache'
// components
import Settings from '../../_SHELL/components/settings'
import RtlLayout from '../../_SHELL/components/RtlLayout'
import ProgressBar from '../../_SHELL/components/ProgressBar'
import LoadingScreen from '../../_SHELL/components/LoadingScreen'
import ThemePrimaryColor from '../../_SHELL/components/ThemePrimaryColor'

import { CollapseDrawerProvider } from '../../_SHELL/contexts/CollapseDrawerContext'
import { SettingsProvider } from '../../_SHELL/contexts/SettingsContext'
import { AuthProvider } from '../_MODERN/contexts/JWTContext'
import { ApolloWrapper } from '../../apollo/ApolloWrapper'
import { UserWrapper, FeedbackWrapper, CartWrapper } from '../../contexts'

import theme from './theme'
import Layout from './layout'
import MainLayout from '../../_SHELL/layouts/main'
import NotistackProvider from '../_MODERN/minimalComponents/NotistackProvider'

import { ContextProvider } from '../../__store/__index'
// import { useGlobalState, mystate } from '../../_store/useGlobalState'

const clientSideEmotionCache = createEmotionCache()
export default ({ element }) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = element
  console.log('element: ', element)
  return (
    <HelmetProvider>
      {/* <Context.Provider value={{ mystate }}> */}
      <ContextProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                {/* <ModernSettingsProvider> */}
                <CollapseDrawerProvider>
                  <CacheProvider value={emotionCache}>
                    {/* <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head> */}

                    <ThemeConfig>
                      <ThemePrimaryColor>
                        <RtlLayout>
                          <NoSsr>
                            <Settings />
                          </NoSsr>
                          <GlobalStyles />
                          <ProgressBar />
                          <LoadingScreen />
                          <ThemeProvider theme={theme}>
                            <ApolloWrapper>
                              <NotistackProvider>
                                <UserWrapper>
                                  <FeedbackWrapper>
                                    <CartWrapper>
                                      <AuthProvider>
                                        <MainLayout>{element}</MainLayout>
                                      </AuthProvider>
                                    </CartWrapper>
                                  </FeedbackWrapper>
                                </UserWrapper>
                              </NotistackProvider>
                            </ApolloWrapper>
                          </ThemeProvider>
                        </RtlLayout>
                      </ThemePrimaryColor>
                    </ThemeConfig>
                  </CacheProvider>
                </CollapseDrawerProvider>
                {/* </ModernSettingsProvider> */}
              </SettingsProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
        {/* </Context.Provider> */}
      </ContextProvider>
    </HelmetProvider>
  )
}
