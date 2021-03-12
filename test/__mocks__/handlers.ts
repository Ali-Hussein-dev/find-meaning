import { rest } from 'msw';
import mockedData from '@/test/mockedData.json';

export const handlers = [
  rest.post<null, { lingua: any; giphy: any }>(
    '/api/handlers',
    (req, res, ctx) => {
      return res(
        ctx.json({
          lingua: mockedData.wikiResponse,
          giphy: mockedData.giphyResponse,
        }),
      );
    },
  ),
];
