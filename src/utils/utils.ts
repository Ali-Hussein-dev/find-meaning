import Axios from 'axios';
export type keyQueryT = 'urban' | 'lingua' | 'giphy';
//--------------------------------------1
export const fetcher_post = async (
  query: string,
  keyQuery: keyQueryT,
): Promise<any> => {
  let promise;
  try {
    promise = await Axios({
      url: '/api/handlers',
      method: 'POST',
      data: {
        query,
        keyQuery,
      },
    });
    return promise;
  } catch (error) {
    console.error(error);
  }
};
//--------------------------------------2
export const fetcher_get = async (url: string, headers = {}): Promise<any> => {
  return await Axios({
    url: url,
    method: 'GET',
    headers: headers,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
