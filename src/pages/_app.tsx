import { ChakraProvider } from '@chakra-ui/react';
import '../css/global.css';
const MyApp: React.FC<{ Component: React.FC; pageProps: any }> = ({
  Component,
  pageProps,
}): JSX.Element => {
  return (
    <ChakraProvider>
      <div className="bg">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
};

export default MyApp;
