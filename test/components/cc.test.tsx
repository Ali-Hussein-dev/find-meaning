import { CC } from '@/components/index';
import { render } from '../testUtils';

describe('CC', () => {
  // eslint-disable-next-line prefer-const
  let isTrue = false;
  it('Should be empty WHEN isTrue is falsy', () => {
    const { container } = render(<CC isTrue={isTrue}>children</CC>);
    expect(container).toBeEmptyDOMElement();
  });
  //--------------------------------------
  it('Should render UI placeholder WHEN isTrue is falsy', () => {
    const { container } = render(
      <CC isTrue={isTrue} fallback={<div>UI placeholder</div>}>
        children
      </CC>,
    );
    expect(container).toHaveTextContent('UI placeholder');
    expect(container).not.toHaveTextContent('children');
  });
  //--------------------------------------
  it('Should render children WHEN isTrue is truthy', () => {
    isTrue = true;
    const { container } = render(<CC isTrue={isTrue}>children</CC>);
    expect(container).toHaveTextContent('children');
  });
  //--------------------------------------
});
