import { SearchBar } from '@/components/index';
import Head from 'next/head';
import * as React from 'react';
import dynamic from 'next/dynamic';
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
    <main className="relative grid w-full h-[91vh] place-items-center">
      <Head>
        <title>Find Meaning</title>
      </Head>
      <div className="z-10 w-11/12 sm:w-10/12 md:w-6/12">
        <div className="center">
          <h1 className="mb-2 text-2xl font-semibold text-center text-orange-700">
            Find-Meaning
          </h1>
          <span className="ml-1 text-xs text-blueGray-400">Demo</span>
        </div>
        <SearchBar pushRouter={true} />
      </div>

      <div className="fixed inset-0 z-0 bg-gradient-blueGray">
        <BgParticleDynamic />
      </div>
    </main>
  );
};

export default Home;
