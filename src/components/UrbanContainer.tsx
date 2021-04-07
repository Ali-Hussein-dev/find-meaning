/* eslint-disable prefer-const */
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TiChevronLeft, TiInfoOutline } from 'react-icons/ti';
import { Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { useFetch } from 'src/utils';
import {
  Gifs,
  DefExm,
  AsyncCondComp,
  CondComp,
  LoadingIndicator,
} from '@/components/index';

//=======================
export const UrbanContainer: React.FC = () => {
  // hooks
  const [isGiphyOpen, setIsGiphyOpen] = React.useState(false);
  const [isUrbanOpen, setIsUrbanOpen] = React.useState(false);
  const [enabledFetchingUrban, setEnabledFetchingUrban] = React.useState(false);
  const [enabledFetchingGiphy, setEnabledFetchingGiphy] = React.useState(false);
  const router = useRouter();
  // eslint-disable-next-line prefer-const
  let query = typeof router.query?.q !== 'string' ? '' : router.query.q;

  const urbanResponse = useFetch(
    ['urban', query],
    'urban',
    enabledFetchingUrban,
  );
  const giphyResponse = useFetch(
    ['giphy', query],
    'giphy',
    enabledFetchingGiphy,
  );
  let urban, giphy;
  urban = urbanResponse.data?.data?.list || [];
  giphy = giphyResponse.data?.data || [];
  React.useEffect(() => {
    if (enabledFetchingUrban && !isUrbanOpen) {
      setEnabledFetchingUrban(false);
    } else if (isUrbanOpen) {
      setEnabledFetchingUrban(true);
    }
    if (enabledFetchingGiphy && !isGiphyOpen) {
      setEnabledFetchingGiphy(false);
    } else if (isGiphyOpen) {
      setEnabledFetchingGiphy(true);
    }
  }, [query, isUrbanOpen, isGiphyOpen]);
  //--------------------------------------
  // functions
  const handleSubmit = (e, keyQ) => {
    e.preventDefault();
    if (keyQ === 'urban') {
      setEnabledFetchingUrban(true);
    } else {
      setEnabledFetchingGiphy(true);
    }
  };
  //--------------------------------------
  return (
    <ErrorBoundary
      FallbackComponent={() => <div role="alert">Something went wrong!</div>}
    >
      <section className="responseContainer">
        <form className="flex items-center justify-between pb-1 mb-2 border-b">
          <span className="font-semibold text-blueGray-400 xxs:text-xs">
            Community Usage
          </span>
          <button
            data-testid="gifs"
            disabled={giphyResponse.isFetching || query.length < 1}
            aria-pressed="false"
            type={isGiphyOpen ? 'button' : 'submit'}
            className="btn px-2 text-sm focus:ring-2 press-effect text-lightBlue-400 xxs:text-xs bg-blue-50"
            onClick={(e) => {
              e.preventDefault();
              if (!isGiphyOpen) {
                handleSubmit(e, 'giphy');
              }
              setIsGiphyOpen(!isGiphyOpen);
            }}
          >
            {isGiphyOpen && giphyResponse.isFetching ? (
              <Spinner size="sm" data-testid="spinner" />
            ) : isGiphyOpen ? (
              'Hide GIFs'
            ) : (
              'Show GIFs'
            )}
          </button>
          <button
            aria-pressed="false"
            disabled={query.length < 1 || urbanResponse.status === 'loading'}
            type={isUrbanOpen ? 'button' : 'submit'}
            className="icon-btn p-1 focus:ring-2"
            onClick={(e) => {
              e.preventDefault();
              if (!isUrbanOpen) {
                handleSubmit(e, 'urban');
              }
              setIsUrbanOpen(!isUrbanOpen);
            }}
          >
            <AsyncCondComp
              isSuccess={urbanResponse.status !== 'loading'}
              isLoading={urbanResponse.status === 'loading'}
              customLoadingComp={<LoadingIndicator size="sm" />}
              isError={urbanResponse.isError}
              customFallbackComp={
                <TiChevronLeft
                  size="25"
                  className={`text-blueGray-400 transition duration-500 ease-in-out transform ${
                    isUrbanOpen ? '-rotate-90' : ''
                  }`}
                />
              }
            >
              <TiChevronLeft
                size="25"
                className={`text-blueGray-400 transition duration-500 ease-in-out transform ${
                  isUrbanOpen ? '-rotate-90' : ''
                }`}
              />
            </AsyncCondComp>
          </button>
        </form>
        <AsyncCondComp
          isSuccess={giphy?.length > 0 && isGiphyOpen}
          isError={giphyResponse.isError}
          isLoading={giphyResponse.isLoading && isGiphyOpen}
          isResponseEmpty={isEmpty(giphy) && isGiphyOpen}
        >
          <Gifs list={giphy} />
        </AsyncCondComp>
        <AsyncCondComp
          isSuccess={!isEmpty(urban) && isUrbanOpen}
          isResponseEmpty={isEmpty(urban) && isUrbanOpen}
          isError={urbanResponse.isError}
          customEmptyResponse={
            <div>
              <TiInfoOutline size="30" className="mx-auto text-orange-700" />
              <p className="text-center">
                No definitions found for <b>{query}</b>
              </p>
            </div>
          }
          className="mt-2 border-b border-blueGray-300"
        >
          <div className="flex flex-col">
            {urban?.map((o, i) => (
              <DefExm
                key={i}
                def={o.definition.replace(/\[|\]|\*/gi, '')}
                exm={o.example.replace(/\[|\]|\*/gi, '').split('\r\n')}
              />
            ))}
          </div>
        </AsyncCondComp>
        <CondComp baseCond={isUrbanOpen}>
          <span className="text-sm italic text-trueGray-400">
            Powered by Urban & Giphy
          </span>
        </CondComp>
      </section>
    </ErrorBoundary>
  );
};
