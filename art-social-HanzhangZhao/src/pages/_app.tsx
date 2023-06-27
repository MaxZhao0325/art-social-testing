import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';

import { theme } from '@/theme';
import { MyUserContextProvider } from '@/utils/useUser';
import { UserAccountProvider } from '../contexts/userContext';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from 'types_user_db';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const inIframe = () => window.location !== window.parent.location;

function App({ Component, pageProps, router }: AppProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <UserAccountProvider>
            <Component {...pageProps} />
          </UserAccountProvider>
        </MyUserContextProvider>
      </SessionContextProvider>
    </ChakraProvider>
  );
}

export default App;
