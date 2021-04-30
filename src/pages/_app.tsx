import { ChakraProvider } from '@chakra-ui/react';
import '../css/global.css';
import { extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Footer } from '@/components/index';
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/test/__mocks__/index');
}
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true,
    },
  },
});
const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins, Sans-serif',
      },
    },
  },
});
const MyApp: React.FC<{ Component: React.FC; pageProps: any }> = ({
  Component,
  pageProps,
}): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <link rel="icon" href="/favicon.ico" />
        <div className="z-10 min-h-screen">
          <Component {...pageProps} />
          <Footer />
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default MyApp;
