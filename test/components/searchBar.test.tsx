import { SearchBar } from '@/components/index';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../testUtils';
/**
 * test cases outline
 * submit button
 * input is empty => submit btn is disabled
 * input isn't empty => submit btn is enabled
 * del button
 * input is empty => del btn is hidden
 * input isn't empty => del btn is displayed
 */
describe('Search Bar', () => {
  it('Submit button: disabled, type, enabled', () => {
    const { container } = render(<SearchBar />);
    const input = container.querySelector('input');
    const submit = screen.getByRole('button', {
      name: 'submit',
    });
    expect(submit).toBeDisabled();
    userEvent.type(input, 'value');
    expect(submit).not.toBeDisabled();
    userEvent.click(submit);
  });
  //--------------------------------------
  it('Del button visibility & functionality', () => {
    /**
     * del btn visibility
     * click -> delete input value and focus input
     */
    const { container } = render(<SearchBar />);
    const input = container.querySelector('input');
    let del = screen.queryByTestId('del-btn');

    expect(del).toBeNull();

    userEvent.type(input, 'value');
    expect(input).toHaveValue('value');

    del = screen.getByTestId('del-btn');
    expect(del).toBeVisible();

    userEvent.click(del);
    expect(input).toHaveValue('');
    expect(document.activeElement).toEqual(input);

    del = screen.queryByTestId('del-btn');
    expect(del).toBeNull();
  });
  //--------------------------------------
});
