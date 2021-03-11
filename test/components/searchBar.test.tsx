import { setupServer } from 'msw/node';
import { rest } from 'msw';
import SearchPage from '@/pages/search';
import { render, screen } from '@/test/testUtils';
import userEvent from '@testing-library/user-event';
import mockedData from '@/test/mockedData.json';

const server = setupServer(
  rest.post('/api/handlers', (req, res, ctx) => {
    return res(
      ctx.json({
        lingua: mockedData.wikiResponse,
        giphy: mockedData.giphyResponse,
      }),
    );
  }),
);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Search Bar', () => {
  test('look up device', () => {
    const { container } = render(<SearchPage />);
    const submit = screen.getByRole('button', {
      name: /submit/i,
    });
    const inputLabel = screen.getByLabelText(/search-input/i);
    userEvent.type(inputLabel, 'device');
    userEvent.click(submit);
    expect(container).toHaveTextContent('Find-Meaning');
  });
});
