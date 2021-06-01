import * as React from 'react';
import { isEmpty } from 'lodash';
import { ErrorBoundary } from 'react-error-boundary';
import { useRouter } from 'next/router';
import { fetcherPost } from 'src/utils';
import {
  IdleUI,
  CondComp,
  Pronunciation,
  WikiLexeme,
  EmptyResponseUI,
  AsyncCondComp,
  CustomSkeleton,
} from '@/components/index';
import { useQuery } from 'react-query';

//=======================
export const WikContainer: React.FC = () => {
  //--------------------------------------hooks
  const router = useRouter();
  const query = typeof router.query?.q !== 'string' ? '' : router.query.q;

  const linguaResponse = useQuery(
    ['lingua', query],
    () => fetcherPost('api/handlers', { query, keyQuery: 'lingua' }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      keepPreviousData: true,
      enabled: query.length <= 1 ? false : true,
    },
  );
  const lingua = linguaResponse.data?.data.lingua;
  const islinguaResponeEmpty = isEmpty(lingua?.entries);
  const lexemes = lingua?.entries?.[0]?.lexemes || [];
  const conjugatedFormsResponse = linguaResponse.data?.data;

  //--------------------------------------functions
  return (
    <ErrorBoundary
      FallbackComponent={() => <div role="alert">Something went wrong!</div>}
    >
      <section className="responseContainer">
        <AsyncCondComp
          isSuccess={!islinguaResponeEmpty}
          isResponseEmpty={islinguaResponeEmpty && !linguaResponse.isIdle}
          isLoading={linguaResponse.isLoading}
          isIdle={linguaResponse.isIdle}
          isError={linguaResponse.isError}
          customIdleComp={<IdleUI />}
          customEmptyResponse={
            <EmptyResponseUI textPlaceholder="No definition has been found" />
          }
          customLoadingComp={
            <div className="w-full mt-3">
              <CustomSkeleton />
            </div>
          }
        >
          <CondComp
            baseCond={!islinguaResponeEmpty}
            className="flex flex-col mb-3 text-xl border-b border-lightBlue-100"
          >
            <div className="flex items-center justify-start gap-x-2">
              <h2 className="font-semibold uppercase text-blueGray-700">
                {query}
              </h2>
              <Pronunciation
                audioSrc={
                  lingua?.entries?.[0]?.pronunciations?.filter(
                    (o) => o.audio,
                  )[0]?.audio?.url
                }
              />
            </div>
          </CondComp>
          {lexemes.map((o, i) => (
            <WikiLexeme
              key={i}
              lexeme={o}
              conjugatedFormsData={conjugatedFormsResponse?.conjugatedForms}
            />
          ))}
          <CondComp baseCond={!islinguaResponeEmpty}>
            <span className="text-sm italic text-trueGray-500">
              Powered by Wiktionary
            </span>
          </CondComp>
        </AsyncCondComp>
      </section>
    </ErrorBoundary>
  );
};
