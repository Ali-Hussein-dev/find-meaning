import * as React from 'react';
import {
  UrbanContainer,
  SearchBar,
  WikContainer,
  FeedbackDrawer,
  FocusBtn,
} from '@/components/index';
import { useRouter } from 'next/router';
import { ErrorBoundary } from 'react-error-boundary';
import Slide from 'react-reveal/Slide';
import Head from 'next/head';
import { isMobile } from 'react-device-detect';

const Fallback = () => <div role="alert">Something went wrong!</div>;

/**
 * @param isInitialPage
 * when path does not have query '/search'
 */
const ResponsesContainer: React.FC<{ isInitialPage: boolean }> = ({
  isInitialPage: isInitialPage,
}) => {
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Slide top duration={200}>
          <WikContainer />
        </Slide>
        {!isInitialPage && (
          <>
            <Slide top duration={300}>
              <UrbanContainer />
            </Slide>
            <FeedbackDrawer />
          </>
        )}
      </ErrorBoundary>
    </>
  );
};

//=======================
const SearchPage: React.FC = () => {
  //--------------------------------------hooks
  const router = useRouter();

  switch (isMobile) {
    case true:
      return (
        <>
          <Head>
            <title>{router.query?.q || 'look up'}</title>
          </Head>
          <main className="relative flex flex-col items-center w-full min-h-screen px-1 pt-2 bg-blueGray-200 bg-pattern">
            <div data-testid="search-page" className="w-full sm:w-[640px]">
              <div className="mb-3 ">
                <SearchBar />
              </div>
              <ResponsesContainer isInitialPage={!router.query?.q} />
            </div>
            <FocusBtn />
          </main>
        </>
      );
      break;

    default:
      return (
        <>
          <Head>
            <title>{router.query?.q || 'look up'}</title>
          </Head>
          <main className="relative flex flex-col items-center w-full min-h-screen px-1 pt-2 bg-blueGray-200 bg-pattern">
            <div data-testid="search-page" className="w-full sm:w-[640px]">
              <div className="mb-3 ">
                <SearchBar />
              </div>
              <ResponsesContainer isInitialPage={!router.query?.q} />
            </div>
          </main>
        </>
      );
      break;
  }
};
export default SearchPage;
