/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Db } from 'mongodb';
import { connectToDB } from 'db/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import * as emailValidator from 'email-validator';
import { addUser, FeedbackT, findUser } from 'db/crud';
//--------------------------------------update-addFeedback
const updateFeedbacks = async (db: Db, _id: string, feedback: FeedbackT) => {
  const query = { _id: _id };
  const updateDocument = {
    $push: { feedbacks: { ...feedback } },
  };
  await db.collection('feedback_popup').updateOne(query, updateDocument);
};
//--------------------------------------write-storeFeedback
const storeFeedback = async (db: Db, _id: string, feedback: FeedbackT) => {
  const user = await findUser(db, _id);
  user.length > 0
    ? updateFeedbacks(db, _id, feedback)
    : addUser(db, {
        _id,
        feedbacks: [feedback],
      });
};
//--------------------------------------feedbackHandler
const feedbackHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const userReq = req.body;
  const { db } = await connectToDB();
  if (emailValidator.validate(userReq.feedback.email)) {
    try {
      await storeFeedback(db, userReq._id, userReq.feedback);
      res.status(200).send('Thank you for your feedback!');
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(200).send({ msg: 'Your email is not valid' });
  }
};
export default feedbackHandler;
