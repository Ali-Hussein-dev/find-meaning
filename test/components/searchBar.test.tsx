// import { mocked } from '@/test/__mocks__';
import { SearchBar } from '@/components/SearchBar';
import { render, screen } from '@/test/testUtils';
import userEvent from '@testing-library/user-event';

// TODO compolete implementation
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe('Search Bar', () => {
  it('should input be disabled WHEN submit event is fired off', () => {
    render(<SearchBar />);
    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    });
    const inputLabel = screen.getByLabelText(/search-input/i);
    userEvent.type(inputLabel, 'value');
    userEvent.click(submitBtn);
    expect(inputLabel).toBeDisabled();
  });
  //--------------------------------------
  it('should submit btn be disabled WHEN input is still empty', () => {
    render(<SearchBar />);
    const submitBtn = screen.getByRole('button', {
      name: /submit/i,
    });
    const inputLabel = screen.getByLabelText(/search-input/i);
    expect(submitBtn).toBeDisabled();
    userEvent.type(inputLabel, 'v');
    expect(submitBtn).not.toBeDisabled();
  });
  //--------------------------------------
  it('Should del btn displayed WHEN start typing', () => {
    render(<SearchBar />);
    const inputLabel = screen.getByLabelText(/search-input/i);
    let delBtn = screen.queryByRole('button', {
      name: /delete-button/i,
    });
    expect(delBtn).toBe(null);
    userEvent.type(inputLabel, 'd');
    delBtn = screen.getByRole('button', {
      name: /delete-button/i,
    });
    expect(delBtn).toBeInTheDocument();
    expect(delBtn).toBeVisible();
  });
  //--------------------------------------
  it('Should match snapshots ', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
    const inputLabel = screen.getByLabelText(/search-input/i);
    userEvent.type(inputLabel, 'device');
    expect(container).toMatchSnapshot();
  });
  //--------------------------------------
});
