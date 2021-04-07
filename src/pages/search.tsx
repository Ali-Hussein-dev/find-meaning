import { UrbanContainer, SearchBar, WikContainer } from '@/components/index';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true,
    },
  },
});

const Fallback = () => <div role="alert">Something went wrong!</div>;

const ResponsesContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchBar />
      <ErrorBoundary FallbackComponent={Fallback}>
        <WikContainer />
        <UrbanContainer />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};
//=======================
const SearchPage: React.FC = () => {
  //--------------------------------------hooks

  //--------------------------------------functions
  return (
    <main className="flex flex-col items-center min-h-screen px-1 bg-gradient-blueGray">
      <title>Find-Meaning | search</title>
      <div
        data-testid="search-page"
        className="z-10 w-full px-1 sm:w-11/12 md:w-9/12 lg:w-8/12"
      >
        <ResponsesContainer />
      </div>
    </main>
  );
};
export default SearchPage;
