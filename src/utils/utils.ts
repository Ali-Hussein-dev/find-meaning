import Axios from 'axios';
//--------------------------------------1
export const fetcher_post = async (query: string): Promise<any> => {
  try {
    return await Axios({
      url: '/api/handlers',
      method: 'POST',
      data: { query },
    });
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
