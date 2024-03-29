import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme, { darkTheme } from '../themes/theme';
import createEmotionCache from '../createEmotionCache';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Section from "../components/Section";
import ReduxProvider from "../globalRedux/provider";
import ReduxPersistGate from '@/globalRedux/persistGate';
import MessageSnackBar from '@/components/MessageSnackBar';
import Main from '@/components/Main';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <ReduxProvider>
      <ReduxPersistGate>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <Main {...props} />
        </CacheProvider>
      </ReduxPersistGate>
    </ReduxProvider>
  );
}

export default appWithTranslation(MyApp);