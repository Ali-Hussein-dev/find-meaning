import { ChakraProvider } from '@chakra-ui/react';
import '../css/global.css';
import { extendTheme } from '@chakra-ui/react';
import { Footer } from '@/components/index';
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/test/__mocks__/index');
}

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
      <link rel="icon" href="/favicon.ico" />
      <div className="z-10 grid min-h-screen place-items-center ">
        <Component {...pageProps} />
        <Footer />
      </div>
    </ChakraProvider>
  );
};

export default MyApp;
