import {
  UrbanContainer,
  SearchBar,
  WikContainer,
  FeedbackDrawer,
} from '@/components/index';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { BsSearch } from 'react-icons/bs';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Head from 'next/head';

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
      {
        const [searchBarOpen, setSearchBarOpen] = React.useState(false);
        return (
          <>
            <Head>
              <title>{router.query?.q || 'look up'}</title>
            </Head>
            <main className="relative flex flex-col items-center w-full min-h-screen px-1 pt-2 bg-blueGray-200 bg-pattern">
              <div
                onClick={() => setSearchBarOpen(false)}
                data-testid="search-page"
                className="w-full px-1 sm:w-[640px]"
              >
                <ResponsesContainer isInitialPage={!router.query?.q} />
              </div>
              {!searchBarOpen && (
                <Zoom wait={100}>
                  <button
                    onClick={() => setSearchBarOpen(true)}
                    type="button"
                    className="icon-btn fixed z-10 w-12 h-12 p-2 shadow-xl from-lightBlue-700 to-emerald-400 bg-gradient-to-tl bottom-1 right-2 text-blueGray-200 rounded-xl press-effect"
                  >
                    <BsSearch className="mx-auto" size="20" />
                  </button>
                </Zoom>
              )}
              {searchBarOpen && (
                <Fade bottom>
                  <div className="fixed bottom-0 z-10 w-full pt-1 bg-blueGray-800">
                    <SearchBar />
                  </div>
                </Fade>
              )}
            </main>
          </>
        );
      }
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
