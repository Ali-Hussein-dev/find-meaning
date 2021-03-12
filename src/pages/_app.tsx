import { ChakraProvider } from '@chakra-ui/react';
import '../css/global.css';
import { extendTheme } from '@chakra-ui/react';
if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/test/__mocks__/index');
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Nunito',
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
      <div className="bg">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
};

export default MyApp;
