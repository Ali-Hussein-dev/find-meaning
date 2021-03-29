import { useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types';
import { keyQueryT, fetcher_post } from './utils';

//--------------------------------------useFetch
export const useFetch = (
  keyQuery: [keyQueryT, string],
  sourceName: keyQueryT,
  enabled: boolean,
): UseQueryResult<any> => {
  return useQuery(keyQuery, () => fetcher_post(keyQuery[1], sourceName), {
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled,
    keepPreviousData: true,
  });
};
