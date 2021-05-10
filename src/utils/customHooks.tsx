import { useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types';
import { keyQueryT, fetcherPost } from './utils';

//--------------------------------------useFetch
export const useFetch = (
  keyQuery: [keyQueryT, string],
  sourceName: keyQueryT,
  enabled: boolean,
): UseQueryResult<any> => {
  return useQuery(
    keyQuery,
    () =>
      fetcherPost('/api/handlers', {
        query: keyQuery[1],
        keyQuery: sourceName,
      }),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled,
      keepPreviousData: true,
    },
  );
};
