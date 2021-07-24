/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Db } from 'mongodb';
//--------------------------------------
const findHeadword = async (db: Db, query: string): Promise<boolean> => {
  const foundQuery = await db
    .collection('autocomplete')
    .find({ _id: query.charAt(0), 'list.h': query })
    .project({ 'list.$': 1 })
    //  or { list: { $slice: 1 } },
    .toArray();

  return foundQuery.length > 0 ? true : false;
};

//--------------------------------------
const pushHeadword = async (db: Db, query: string) => {
  await db
    .collection('autocomplete')
    .updateOne({ _id: query.charAt(0) }, { $push: { list: { h: query } } });
};

//--------------------------------------
export const storeHeadword = async (
  db: Db,
  query: string,
): Promise<void | true> => {
  const isQueryInDB = await findHeadword(db, query);
  if (isQueryInDB) return;
  if (!isQueryInDB) {
    pushHeadword(db, query);
    return true;
  }
};
