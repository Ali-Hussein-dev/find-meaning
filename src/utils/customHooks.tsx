import * as React from 'react';
import { useQuery } from 'react-query';
import { UseQueryResult } from 'react-query/types';
import { fetcher_post } from './utils';
import { Ctx } from '../pages/search';
//--------------------------------------useFetch
export const useFetch = (
  query: string,
  isEnabled = false
): UseQueryResult<any> => {
  const setFreshData = React.useContext(Ctx)?.setFreshData;
  return useQuery(['lingua', query], () => fetcher_post(query), {
    staleTime: Infinity,
    enabled: isEnabled,
    onSuccess: (d) => {
      setFreshData(d);
    },
  });
};
