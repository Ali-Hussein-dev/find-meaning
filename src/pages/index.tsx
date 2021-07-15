import { SearchBar } from '@/components/index';
import Head from 'next/head';
import * as React from 'react';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

//--------------------------------------
export const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>WordsG</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <main className="relative grid w-full h-[93vh] place-items-center bg-blueGray-800">
        <div className="w-full sm:w-[640px] px-4 mb-48">
          <Zoom>
            <img
              src="/icons/fm_logo.svg"
              className="w-32 h-32 mx-auto"
              alt="logo"
            />
          </Zoom>
          <div className="flex flex-col">
            <div className="center">
              <h1 className="mb-2 text-2xl font-semibold text-center text-orange-700">
                WordsG
              </h1>
              <span className="ml-1 text-xs text-blueGray-400">
                prototype-phase
              </span>
            </div>
            {/* <span className="text-blueGray-200 ">
              English Dictionary For Ambitious Learners
            </span> */}
          </div>
          <div></div>
          <Fade bottom wait={100}>
            <SearchBar />
          </Fade>
        </div>
      </main>
    </>
  );
};

export default Home;
