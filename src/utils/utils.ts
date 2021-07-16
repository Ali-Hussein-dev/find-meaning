/* eslint-disable prefer-const */
import Axios, { AxiosResponse } from 'axios';
export type keyQueryT = 'urban' | 'lingua' | 'giphy';
//--------------------------------------fetcher_post
interface DataPost {
  [key: string]: any;
}
export const fetcherPost = async (
  url: string,
  data: DataPost,
): Promise<AxiosResponse> => {
  let promise;
  try {
    promise = await Axios({
      url: url,
      method: 'POST',
      data,
    });
    return promise;
  } catch (error) {
    console.error(error);
  }
};
export const fetcherGet = async (
  { query = '' },
  url = 'api/autocomplete?q=',
): Promise<any> => {
  const q = encodeURIComponent(query);
  try {
    // Create a new AbortController instance for this request
    const controller = new AbortController();
    // Get the abortController's signal
    const signal = controller.signal;
    const promise = fetch(`${url}${q}`, {
      signal,
    }).then((response) => response.json());
    // Cancel the request if React Query calls the `promise.cancel` method
    // @ts-ignore
    promise.cancel = () => controller.abort();
    return promise;
  } catch (err) {
    console.error(err);
  }
};
//--------------------------------------fetcher_get
interface HeaderParamsT {
  [key: string]: string;
}
interface FetcherGetParams {
  url: string;
  headers?: HeaderParamsT;
  params?: HeaderParamsT;
}
export const fetcher_get = async (config: FetcherGetParams): Promise<any> => {
  const { url, headers, params } = config;
  return await Axios({
    url: url,
    method: 'GET',
    headers: headers || {},
    params,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
//--------------------------------------types
type partOfSpeechT = 'verb' | 'noun' | 'adjective' | 'adverb' | 'preposition';
// interface WFormT {
//   form: partOfSpeechT; // "noun" OR "adjective"
//   list: string[]; // e.x ["car","cars"] OR ["",""]
// }

export interface Upcomming {
  w: string;
  partOfSpeechList: partOfSpeechT[];
  // wForms: WFormT[];
}

/**
 * HOW TO GET CONJUGATED FORMS
 * first check IF query is a verb,
 *    WHEN true => call the API ELSE do not call
 * second check IF there are conjugated forms to the query,
 *    WHEN true => assign the results to the response obj ELSE: do not
 */
//--------------------------------------conjugated-forms-API -> isVerb
export const isVerb = (lingua: any = {}): boolean => {
  if (lingua.entries.length < 1) return false;
  let isVerb = false;
  lingua.entries[0].lexemes.map((o) => {
    if (o.partOfSpeech === 'verb') {
      isVerb = true;
      return isVerb;
    }
  });
  return isVerb;
};
//--------------------------------------conjugated-forms-API -> getContinousForm
export const getContinousForm = async (
  conjugatedForms: any = {},
): Promise<string> => {
  const continousForm = conjugatedForms.conjugation_tables.indicative.filter(
    (o) => o.heading === 'present progressive',
  );
  const formStr = continousForm[0].forms[0][1]
    .split(' ')
    .slice(continousForm.length)[0];
  return formStr;
};
