/* eslint-disable no-fallthrough */
import { NextApiRequest, NextApiResponse } from 'next';
import { DictionaryReqObj, giphy } from './API_Data';
import { fetcher_get } from 'src/utils/index';

const urban = new DictionaryReqObj(
  'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=',
  process.env.URBAN_HOST,
);
const lingua = new DictionaryReqObj(
  'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/',
  process.env.LINGUA_HOST,
);

const response = {
  urban: undefined,
  giphy: undefined,
  lingua: undefined,
};
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  if (req.method === 'POST') {
    const { query, keyQuery } = req.body;
    if (query.length === 0) {
      res.status(404).send(`you must provide a query`);
    }
    switch (keyQuery) {
      case 'urban':
        try {
          response.urban = await fetcher_get(
            urban.getUrl(query),
            urban.headers,
          );
          response.urban.list.sort((a, b) => b.thumbs_up - a.thumbs_up);
          if (response.urban?.list?.length > 5) {
            response.urban.list.length = 5;
          }
          res.status(200).end(JSON.stringify(response.urban));
        } catch (error) {
          console.error(error);
        }
        break;
      case 'lingua':
        try {
          response.lingua = await fetcher_get(
            lingua.getUrl(query),
            lingua.headers,
          );
          res.status(200).end(JSON.stringify(response.lingua));
        } catch (error) {
          console.error(error);
        }
        break;
      case 'giphy':
        try {
          response.giphy = await fetcher_get(giphy.getUrl(query));
          res.status(200).end(JSON.stringify(response.giphy?.data));
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        res.status(404).send(`${keyQuery} is not available`);
    }
  } else {
    res.status(404).send(`${req.method} request is not accepted`);
  }
};
export default handler;
