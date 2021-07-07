import { connectToDB } from 'db/connect';
import { findByStartWith } from 'db/crud';
import { NextApiRequest, NextApiResponse } from 'next';

const autocompleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const query = JSON.parse(req.body).query;
  if (!query) {
    console.error('autocompelete: query is' + query);
    res.status(406).end();
  }
  const { db } = await connectToDB();
  const response = {
    suggestions: undefined,
  };

  const dbResponse = await findByStartWith(db, query);
  response.suggestions = dbResponse;
  const length = response.suggestions[0]?.list.length;

  if (length > 0) {
    res.status(200).end(JSON.stringify(response));
  } else {
    res.status(404).end();
  }
};

export default autocompleteHandler;
