import {
  UrbanContainer,
  SearchBar,
  WikContainer,
  CondComp,
} from '@/components/index';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

const Fallback = () => <div role="alert">Something went wrong!</div>;

const ResponsesContainer = () => {
  const router = useRouter();
  return (
    <>
      <SearchBar />
      <ErrorBoundary FallbackComponent={Fallback}>
        <WikContainer />
        <CondComp baseCond={!!router.query?.q} isFragment>
          <UrbanContainer />
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
    <main className="flex flex-col items-center min-h-screen px-1 bg-gradient-blueGray">
      <title>{router.query.q || 'Find Meaning'}</title>
      <div
        data-testid="search-page"
        className="z-10 w-full px-1 sm:w-11/12 md:w-8/12 lg:w-6/12"
      >
        <ResponsesContainer />
      </div>
    </main>
  );
};
export default SearchPage;
