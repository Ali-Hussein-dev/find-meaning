import { FocusBtn, SearchBar } from '@/components/index';
import Head from 'next/head';
import * as React from 'react';
import { isMobile } from 'react-device-detect';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

//--------------------------------------
export const Home = (): JSX.Element => {
  switch (isMobile) {
    case true:
      return (
        <>
          <Head>
            <title>Find-Meaning</title>
            <link rel="icon" href="/favicon/favicon.ico" />
          </Head>
          <main className="relative w-full h-[97vh] bg-blueGray-800 flex flex-col px-1 justify-start">
            <Fade top wait={100}>
              <SearchBar />
            </Fade>
            <section className="flex flex-col justify-center flex-grow w-full">
              <img
                src="/icons/fm_logo.svg"
                className="w-24 h-24 mx-auto"
                alt="logo"
              />
              <h1 className="mb-0 text-lg font-semibold text-center text-orange-700">
                Find-Meaning
                <span className="ml-1 text-xs italic text-blueGray-400">
                  prototype
                </span>
              </h1>
              <h2 className="block text-xl text-center text-blueGray-200">
                Dictionary For Ambitious Learners
              </h2>
            </section>
            <FocusBtn />
          </main>
        </>
      );
      break;
    default:
      return (
        <>
          <Head>
            <title>Find-Meaning</title>
            <link rel="icon" href="/favicon/favicon.ico" />
          </Head>
          <main className="grid w-full h-[93vh] place-items-center bg-blueGray-800">
            <section className="sm:w-[640px] mb-48">
              <Zoom>
                <img
                  src="/icons/fm_logo.svg"
                  className="w-32 h-32 mx-auto"
                  alt="logo"
                />
              </Zoom>
              <h1 className="mb-0 text-2xl font-semibold text-center text-orange-700">
                Find-Meaning
                <span className="ml-1 text-xs italic text-blueGray-400">
                  prototype
                </span>
              </h1>
              <h2 className="block text-lg font-bold text-center text-blueGray-200">
                Dictionary For Ambitious Learners
              </h2>
              <Fade bottom wait={100}>
                <SearchBar />
              </Fade>
            </section>
          </main>
        </>
      );
      break;
  }
};

export default Home;
