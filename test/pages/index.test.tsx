import React from 'react';
import { render } from '../testUtils';
import { Home } from '../../src/pages/index';

describe('Home page', () => {
  it('Home page', () => {
    const { container, asFragment } = render(<Home />);
    expect(container).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
