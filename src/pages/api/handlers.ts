import { NextApiRequest, NextApiResponse } from 'next';
import { giphy, lingua } from './API_Data';
import { fetcher_get } from 'src/utils/index';
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  if (req.method === 'POST') {
    const { query } = req.body;
    try {
      let wikiResponse, giphyResponse;
      await Promise.all([
        fetcher_get(lingua.getUrl(query), lingua.headers),
        fetcher_get(giphy.getUrl(query)),
      ]).then((results) => {
        (wikiResponse = results[0]), (giphyResponse = results[1]);
      });

      res.status(200).end(
        JSON.stringify({
          lingua: wikiResponse,
          giphy: giphyResponse,
        })
      );
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(404).send(`${req.method} request is not accepted`);
  }
};

export default handler;
