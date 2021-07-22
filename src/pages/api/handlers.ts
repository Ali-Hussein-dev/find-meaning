/* eslint-disable no-fallthrough */
import { NextApiRequest, NextApiResponse } from 'next';
import { DictionaryReqObj, giphy } from './API_Data';
import { fetcher_get, getContinousForm, isVerb } from 'src/utils/';
import { storeHeadword, connectToDB } from 'db/';

const urbanConfig = new DictionaryReqObj(
  'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=',
  process.env.URBAN_HOST,
  process.env.rapidapi_key,
);
const linguaConfig = new DictionaryReqObj(
  'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/',
  process.env.LINGUA_HOST,
  process.env.rapidapi_key,
);
const conjugatedFormsConfig = new DictionaryReqObj(
  'https://linguatools-conjugations.p.rapidapi.com/conjugate/',
  process.env.CONJUGATIONS_HOST,
  process.env.rapidapi_key,
);

//--------------------------------------handler
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  const response = {
    urban: undefined,
    giphy: undefined,
    lingua: undefined,
    conjugatedForms: undefined,
  };

  let entry, db;
  try {
    const connect = await connectToDB();
    db = connect.db;
  } catch (err) {
    // !todo:  exposed sensitive info when error ocurrs, fix required
    console.error(err);
  }

  if (req.method === 'POST') {
    const { query, keyQuery } = req.body;
    if (!query || !keyQuery) {
      res.status(406).send(`you must provide a query`);
    }
    switch (keyQuery) {
      case 'urban':
        response.urban = await fetcher_get({
          url: urbanConfig.getUrl(query),
          headers: urbanConfig.headers,
        });
        response.urban?.list?.sort((a, b) => b.thumbs_up - a.thumbs_up);
        if (response.urban?.list?.length > 5) {
          response.urban.list.length = 5;
        }
        res.status(200).end(JSON.stringify(response.urban));
        break;
      case 'lingua':
        response.lingua = await fetcher_get({
          url: linguaConfig.getUrl(query),
          headers: linguaConfig.headers,
        });
        if (isVerb(await response.lingua)) {
          const conjugatedFormsRes = await fetcher_get({
            url: conjugatedFormsConfig.baseUrl,
            headers: conjugatedFormsConfig.headers,
            params: { verb: query },
          });
          if (conjugatedFormsRes.result === 'OK') {
            response.conjugatedForms = [
              ['Infinitive', conjugatedFormsRes.conjugated_forms[0][1]],
              ['Simple past', conjugatedFormsRes.conjugated_forms[1][1]],
              ['Past participle', conjugatedFormsRes.conjugated_forms[2][1]],
              ['Continous', await getContinousForm(conjugatedFormsRes)],
            ];
          }
        }
        //--------------------------------------storeQuery-start
        entry =
          typeof response.lingua.entries[0].entry === 'string'
            ? response.lingua.entries[0].entry
            : undefined;
        entry && storeHeadword(db, entry);
        //--------------------------------------storeQuery-end
        res.status(200).end(JSON.stringify(response));
        break;
      case 'giphy':
        response.giphy = await fetcher_get({ url: giphy.getUrl(query) });
        res.status(200).end(JSON.stringify(response.giphy?.data));
        break;
      default:
        res.status(404).send(`${keyQuery} is not available`);
    }
  } else {
    res.status(404).send(`${req.method} request is not accepted`);
  }
};
export default handler;
