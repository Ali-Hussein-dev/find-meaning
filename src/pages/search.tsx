import { SearchBar, WikiResponse } from '@/components/index';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
//--------------------------------------
interface CtxFreshData {
  freshData: any;
  setFreshData: (prvState: any) => void;
}

const queryClient = new QueryClient();
export const Ctx = React.createContext<CtxFreshData | null>(null);
const Fallback = () => <div role="alert">Something went wrong!</div>;
//=======================
const SearchPage: React.FC = () => {
  // hooks
  const [freshData, setFreshData] = React.useState<any>(null);
  //--------------------------------------
  // functions
  //--------------------------------------
  return (
    <QueryClientProvider client={queryClient}>
      <Ctx.Provider value={{ freshData, setFreshData }}>
        <title>Find-Meaning | search</title>
        <main className="flex flex-col items-center min-h-screen px-1 bg-blueGray-800">
          <div
            data-testid="search-page"
            className="w-full px-1 sm:w-10/12 md:w-8/12"
          >
            <SearchBar />
            <ErrorBoundary FallbackComponent={Fallback}>
              <WikiResponse />
            </ErrorBoundary>
          </div>
        </main>
      </Ctx.Provider>
    </QueryClientProvider>
  );
};
export default SearchPage;
