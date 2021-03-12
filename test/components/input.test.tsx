import { Input } from '@/components/Input';
import { screen, render } from '../testUtils';

describe('Input', () => {
  test('Disabled input', () => {
    render(<Input disabled={true} />);
    const input = screen.getByLabelText('search-input');
    expect(input).toBeDisabled();
  });
});
