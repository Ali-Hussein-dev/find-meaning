import { SearchBar, WikiResponse } from '@/components/index';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import dynamic from 'next/dynamic';
const BgParticleDynamic = dynamic(() =>
  import('../../src/components/index').then((com) => com.BgParticles),
);
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
        <main className="flex flex-col items-center min-h-screen px-1 bg-gradient-blueGray">
          <div
            data-testid="search-page"
            className="z-10 w-full px-1 sm:w-11/12 md:w-9/12 lg:w-8/12"
          >
            <SearchBar />
            <ErrorBoundary FallbackComponent={Fallback}>
              <WikiResponse />
            </ErrorBoundary>
          </div>
          <div className="fixed inset-0 z-0 h-screen">
            <BgParticleDynamic velocity={0.1} count={85} />
          </div>
        </main>
      </Ctx.Provider>
    </QueryClientProvider>
  );
};
export default SearchPage;
