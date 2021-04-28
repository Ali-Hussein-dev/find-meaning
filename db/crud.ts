/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Db } from 'mongodb';
//--------------------------------------types
export interface FeedbackT {
  name: string;
  email: string;
  feedback: string;
  stars: number | undefined;
}
export interface UserT {
  _id: string;
  feedbacks: FeedbackT[];
}
//--------------------------------------read-isUserExist
export const findUser = async (db: Db, _id: string) => {
  return await db
    .collection('feedback_popup')
    .find({ _id: { $eq: _id } })
    .toArray();
};
//--------------------------------------write-addUser
export const addUser = async (db: Db, user: UserT) => {
  return await db.collection('feedback_popup').insertOne(user);
};
