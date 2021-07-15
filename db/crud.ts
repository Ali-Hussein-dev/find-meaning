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
//--------------------------------------read-suggestions
export const findByStartWith = async (db: Db, query: string) => {
  return await db
    .collection('autocomplete')
    .aggregate([
      { $match: { _id: query.charAt(0) } },
      {
        $project: {
          list: {
            $slice: [
              {
                $filter: {
                  input: '$list',
                  as: 'item',
                  cond: {
                    $regexFind: {
                      input: '$$item.h',
                      regex: `^${query}`,
                      options: 'm',
                    },
                  },
                },
              },
              0,
              5,
            ],
          },
        },
      },
    ])
    .toArray();
};
