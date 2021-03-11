import { setupServer } from 'msw/node';
import { rest } from 'msw';
import mockedData from '@/test/mockedData.json';
import { useFetch } from 'src/utils';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/dom';

const server = setupServer(
  rest.post('/api/handlers', (req, res, ctx) => {
    return res(
      ctx.json({
        lingua: mockedData.wikiResponse,
        giphy: mockedData.giphyResponse,
      })
    );
  })
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());
afterEach(() => server.resetHandlers());
const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe('Search Bar', () => {
  test('look up device', async () => {
    let isEnabled = false;
    const { result } = renderHook(() => useFetch('device', isEnabled), {
      wrapper,
    });
    expect(result.current.isFetching).toBe(false);
    isEnabled = true;
    await waitFor(() => result.current.isSuccess);
    // console.log(result.current);
  });
});
