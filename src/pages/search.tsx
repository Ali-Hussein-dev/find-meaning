import {
  UrbanContainer,
  SearchBar,
  WikContainer,
  CondComp,
} from '@/components/index';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import Slide from 'react-reveal/Slide';
import dynamic from 'next/dynamic';

const DynamicFeedbackDrawer = dynamic(
  () => import('@/components/index').then((index) => index.FeedbackDrawer),
  { ssr: false },
);
const Fallback = () => <div role="alert">Something went wrong!</div>;

const ResponsesContainer: React.FC<{ isInitial: boolean }> = ({
  isInitial,
}) => {
  return (
    <>
      <SearchBar />
      <ErrorBoundary FallbackComponent={Fallback}>
        <Slide top duration={200}>
          <WikContainer />
        </Slide>
        <CondComp baseCond={isInitial} isFragment>
          <Slide top duration={300}>
            <UrbanContainer />
          </Slide>
        </CondComp>
      </ErrorBoundary>
    </>
  );
};
//=======================
const SearchPage: React.FC = () => {
  //--------------------------------------hooks
  const router = useRouter();
  //--------------------------------------functions
  return (
    <main className="relative flex flex-col items-center w-full min-h-screen px-1 bg-blueGray-800 bg-pattern">
      <title>look up {`: ${router.query.q}`} </title>
      <div
        data-testid="search-page"
        className="z-10 w-full px-1 sm:w-11/12 md:w-7/12 lg:w-5/12"
      >
        <ResponsesContainer isInitial={!!router.query?.q} />
        {!!router.query?.q && <DynamicFeedbackDrawer />}
      </div>
    </main>
  );
};
export default SearchPage;
