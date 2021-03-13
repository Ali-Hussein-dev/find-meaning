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
        <h2 className="mb-2 text-2xl font-semibold text-center text-blueGray-300">
          Find-Meaning
        </h2>
        <span className="ml-1 text-xs text-blueGray-400">Demo</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center "
      >
        <div className="flex-grow overflow-hidden rounded-lg shadow">
          <Input
            value={inputValue}
            onChange={handleChange}
            cn="text-blueGray-800 focus-within:bg-blueGray-300 opacity-90 bg-blueGray-700"
          />
        </div>
        <label>
          <button
            role="button"
            type="submit"
            aria-label="submit"
            className="w-12 h-12 p-3 rounded focus:outline-none focus:bg-blueGray-300"
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
    <div className="grid h-screen place-items-center bg-blueGray-100 text-blueGray-600">
      <Head>
        <title>Find-Meaning</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className="relative grid w-full min-h-screen place-items-center bg-blueGray-800">
        <HomeInput />
        <div className="absolute inset-0 z-0">
          <BgParticleDynamic />
        </div>
      </main>
    </div>
  );
};

export default Home;
