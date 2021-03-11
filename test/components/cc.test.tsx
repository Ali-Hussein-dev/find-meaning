import { CC } from '@/components/index';
import { render } from '../testUtils';

describe('Conditional Component Util', () => {
  test('Expect empty DOM element WHEN prop is falsy', () => {
    const { container } = render(
      <CC isTrue={''}>
        <span>children</span>{' '}
      </CC>,
    );
    expect(container).toBeEmptyDOMElement();
  });
  test('Expect DOM element WHEN prop is truthy', () => {
    const { container } = render(
      <CC isTrue={'true'}>
        <span>children</span>{' '}
      </CC>,
    );
    expect(container).toHaveTextContent('children');
  });
});
