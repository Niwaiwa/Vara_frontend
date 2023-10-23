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
import { useSelector } from 'react-redux';
import { RootState } from '@/globalRedux/store';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MainProps extends AppProps {
  emotionCache?: EmotionCache;
}

const Main: React.FC<MainProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const themeMode = useSelector((state: RootState) => state.themeMode.themeMode);
  return (
    <ThemeProvider theme={themeMode === 'light' ? theme : darkTheme}>
    {/* <ThemeProvider theme={theme}> */}
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {/* <Navigation changeThemeMode={setThemeMode} /> */}
      <Navigation />
      <Section>
        <Component {...pageProps} />  
      </Section>
      <Section>
        <Footer />
      </Section>
      <MessageSnackBar />
    </ThemeProvider>
  );
}

export default Main;
