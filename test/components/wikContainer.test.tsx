import { WikContainer } from '@/components/index';
import { render } from '@/test/testUtils';

describe('WikContainer', () => {
  test('Should render idle UI placeholder', () => {
    const { container } = render(<WikContainer />);
    expect(container).toHaveTextContent('Tip');
  });
});
