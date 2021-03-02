import { ChakraProvider } from '@chakra-ui/react';
import '../css/global.css';
const MyApp: React.FC<{ Component: React.FC; pageProps: any }> = ({
  Component,
  pageProps,
}): JSX.Element => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
