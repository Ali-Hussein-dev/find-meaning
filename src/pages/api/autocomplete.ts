import { connectToDB } from 'db/connect';
import { findByStartWith } from 'db/crud';
import { NextApiRequest, NextApiResponse } from 'next';

const autocompleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const query = req.query.q;
  const { db } = await connectToDB();
  const response = {
    suggestions: undefined,
  };
  // @ts-ignore
  const dbResponse = await findByStartWith(db, query);
  const length = dbResponse[0]?.list.length;

  if (length > 0) {
    response.suggestions = dbResponse;
    res.status(200).end(JSON.stringify(response));
  } else {
    res.status(404).end();
  }
};

export default autocompleteHandler;
