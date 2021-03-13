import * as React from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { isEmpty } from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';
import { TiInfoOutline } from 'react-icons/ti';
import { Tooltip } from '@chakra-ui/react';
import { Ctx } from '../pages/search';
import { CC, Gifs, Pronunciation, WikiLexeme } from '@/components/index';

//=======================
export const WikiResponse: React.FC = () => {
  // hooks
  const currentQueryClient = useQueryClient();
  const router = useRouter();
  const freshData = React.useContext(Ctx)?.freshData;
  const query = typeof router.query.q === 'string' ? router.query.q : '';
  const cachedData: any = currentQueryClient.getQueryData(['lingua', query]);
  const [isVisible, setIsVisible] = React.useState(true);
  //--------------------------------------
  let data;
  data = freshData?.data;
  if (cachedData) {
    data = cachedData?.data;
  } else {
    data = freshData?.data;
  }
  const isResponse = isEmpty(data?.lingua?.entries);
  const isGiphyResponse = isEmpty(data?.giphy?.data);
  const lexemes = data?.lingua?.entries?.[0]?.lexemes;
  // functions
  //--------------------------------------
  return (
    <ErrorBoundary
      FallbackComponent={() => <div role="alert">Something went wrong!</div>}
    >
      <div className="py-3 pl-2 pr-1 mb-3 border rounded-lg text-trueGray-600 bg-trueGray-50 bg-gradient-to-t from-trueGray-300 to-trueGray-50">
        <CC
          isTrue={!isResponse}
          className="flex flex-col mb-3 text-xl border-b border-lightBlue-100"
        >
          <div className="flex items-center justify-start mb-2 gap-x-2">
            <h2 className="font-semibold ">{query}</h2>
            <Pronunciation
              audioSrc={
                data?.lingua?.entries?.[0]?.pronunciations?.filter(
                  (o) => o.audio,
                )[0]?.audio?.url
              }
            />
            <button
              className="px-1 py-1 ml-auto text-sm font-semibold rounded rounde text-lightBlue-500 focus:outline-none focus:bg-blueGray-100"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? 'Hide' : 'Show gifs'}
            </button>
          </div>
          <CC isTrue={!isGiphyResponse && isVisible}>
            <Gifs list={data?.giphy?.data} />
          </CC>
        </CC>
        {!isResponse ? (
          lexemes.map((o, i) => <WikiLexeme key={i} lexeme={o} />)
        ) : query === '' ? (
          <div className="pl-2 border-l-2 border-orange-800">
            💡 Tip: To quickly find relevant definitions, find the right{' '}
            <Tooltip
              hasArrow
              label="i.e: noun, verb, adjective, adverb"
              aria-label="tooltip"
              className="italic"
            >
              <span className="italic text-orange-800">parts of speech</span>
            </Tooltip>{' '}
            and then the{' '}
            <Tooltip
              hasArrow
              label="i.e: computing, medicine, transport"
              aria-label="tooltip"
              className="italic"
            >
              <span className="italic text-orange-800">context</span>
            </Tooltip>{' '}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <TiInfoOutline size="30" className="text-orange-700" />
            No definitions found, you may check your spelling!
          </div>
        )}
        <CC isTrue={!isResponse}>
          <span className="text-sm italic text-trueGray-400">
            Powered by Wiktionary & Giphy
          </span>
        </CC>
      </div>
    </ErrorBoundary>
  );
};
