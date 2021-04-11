import { SearchBar } from '@/components/index';
import Head from 'next/head';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { queryClient } from './search';
import { QueryClientProvider } from 'react-query';
import store from 'store2';
import { initialSuggestions } from 'src/utils';

const BgParticleDynamic = dynamic(
  () => import('../../src/components/index').then((com) => com.BgParticles),
  { ssr: false },
);

export const Home = (): JSX.Element => {
  const storedKey = store.has('wik');
  if (!storedKey) {
    store.set('wik', initialSuggestions);
  }
  storedKey;
  return (
    <div className="grid h-screen place-items-center text-blueGray-600">
      <Head>
        <title>Find Meaning</title>
      </Head>
      <main className="relative grid w-full min-h-screen place-items-center">
        <QueryClientProvider client={queryClient}>
          <div className="z-10 w-11/12 sm:w-10/12 md:w-6/12">
            <div className="flex items-center justify-center">
              <h1 className="mb-2 text-2xl font-semibold text-center text-orange-700">
                Find-Meaning
              </h1>
              <span className="ml-1 text-xs text-blueGray-400">Demo</span>
            </div>
            <SearchBar pushRouter={true} />
          </div>
        </QueryClientProvider>
        <div className="fixed inset-0 z-0 h-screen bg-gradient-blueGray">
          <BgParticleDynamic />
        </div>
      </main>
    </div>
  );
};

export default Home;
