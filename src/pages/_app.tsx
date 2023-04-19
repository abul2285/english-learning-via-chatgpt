import { ConfigProvider } from 'antd';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '~/utils/api';

import Navigation from '~/components/Layout/Navigation/Navigation';
import 'antd/dist/reset.css';
import '../styles/global.css';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <Navigation />
        <Component {...pageProps} />
      </ConfigProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
