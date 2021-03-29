import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../testUtils';
import { UrbanContainer } from '@/components/index';

describe('urban container', () => {
  it('Should toggle btn type WHEN clicked', () => {
    render(<UrbanContainer />);
    const gifsBtn = screen.getByTestId('gifs');
    expect(gifsBtn.getAttribute('type')).toEqual('submit');
    userEvent.click(gifsBtn);
    gifsBtn.setAttribute('type', 'button');
    expect(gifsBtn.getAttribute('type')).toEqual('button');
    // const spinner = screen.getByTestId('spinner');
    // expect(spinner).toBeVisible();
    // expect(gifsBtn.getAttribute('type')).toEqual('button');
    // userEvent.click(gifsBtn);
    // expect(spinner).toBeVisible();
  });
  //--------------------------------------
});
