import { DefExm } from '@/components/DefExm';
import { render } from '@/test/testUtils';

describe('DefExm component', () => {
  test('expect text content', () => {
    const { container } = render(
      <DefExm def="definition..." exm="example..." context={['computing']} />
    );

    expect(container).toHaveTextContent('computing definition');
    expect(container).toHaveTextContent('example');
  });
});
