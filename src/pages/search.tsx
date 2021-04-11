import { UrbanContainer, SearchBar, WikContainer } from '@/components/index';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';

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
