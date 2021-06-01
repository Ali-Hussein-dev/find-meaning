import { connectToDB } from 'db/connect';
import { findByStartWith } from 'db/crud';
import { NextApiRequest, NextApiResponse } from 'next';

const autocompleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const query = req.body.query;
  const { db } = await connectToDB();
  const response = {
    suggestions: undefined,
  };
  if (query) {
    response.suggestions = await findByStartWith(db, query);
    res.status(200).end(JSON.stringify(response));
  } else {
    res.status(200).end(JSON.stringify([]));
  }
};

export default autocompleteHandler;
