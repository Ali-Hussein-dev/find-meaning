import { Input } from '@/components/index';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BsSearch } from 'react-icons/bs';
import dynamic from 'next/dynamic';
const BgParticleDynamic = dynamic(() =>
  import('../../src/components/index').then((com) => com.BgParticles),
);

const HomeInput = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: { q: inputValue.toLowerCase() },
    });
  };
  const [inputValue, setInputValue] = React.useState('');
  const handleChange = React.useCallback(
    (e) => setInputValue(e.target.value),
    [],
  );
  return (
    <div className="z-10 w-11/12 sm:w-8/12 md:w-6/12 ">
      <div className="flex items-center justify-center">
        <h2 className="mb-2 text-2xl font-semibold text-center text-orange-700">
          Find-Meaning
        </h2>
        <span className="ml-1 text-xs text-blueGray-400">Demo</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center overflow-hidden rounded-lg shadow bg-blueGray-700 opacity-90"
      >
        <Input
          value={inputValue}
          onChange={handleChange}
          cn="flex-grow text-blueGray-800 focus-within:bg-blueGray-300 opacity-90 bg-blueGray-700"
        />
        <label>
          <button
            role="button"
            type="submit"
            aria-label="submit"
            className="w-12 h-12 p-3 focus:outline-none focus:bg-blueGray-600"
          >
            <BsSearch className="mx-auto text-blueGray-100" />
          </button>
        </label>
      </form>
    </div>
  );
};
export const Home = (): JSX.Element => {
  return (
    <div className="grid h-screen place-items-center text-blueGray-600">
      <Head>
        <title>Find-Meaning</title>
      </Head>
      <main className="relative grid w-full min-h-screen place-items-center">
        <HomeInput />
        <div className="fixed inset-0 z-0 h-screen bg-gradient-blueGray">
          <BgParticleDynamic />
        </div>
      </main>
    </div>
  );
};

export default Home;
