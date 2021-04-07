import { storeSuggestion, getSuggestions } from 'src/utils/index';
import store from 'store2';

store.get = jest.fn(() => {
  return [
    { w: 'doom' },
    { w: 'do' },
    { w: 'dice' },
    { w: 'doom' },
    { w: 'does' },
    { w: 'dime' },
    { w: 'dream' },
    { w: 'dreams' },
    { w: 'ice' },
  ];
});

describe('getSuggestions', () => {
  let suggestions;
  test('Should return different results when matching', () => {
    suggestions = getSuggestions('wik', 'do');
    expect(suggestions.length).toBe(4);
    suggestions = getSuggestions('wik', 'di');
    expect(suggestions.length).toBe(2);
    suggestions = getSuggestions('wik', 'i');
    expect(suggestions.length).toBe(1);
  });
  //--------------------------------------
  it('Should return at most 7 results WHEN matching', () => {
    suggestions = getSuggestions('wik', 'd');
    expect(suggestions.length).toBe(7);
  });
  //--------------------------------------
  it('Should return last queries WHEN input value is empty', () => {
    suggestions = getSuggestions('wik', '');
    expect(suggestions.length).toBe(7);
  });
  //--------------------------------------
  it('Should empty array WHEN unmatching', () => {
    suggestions = getSuggestions('wik', 'c');
    expect(suggestions.length).toBe(0);
  });
  //--------------------------------------
});

describe('StoreSuggestions', () => {
  test('Should throw error WHEN failed to add new suggestion', () => {
    const storedSuggestion = () => storeSuggestion('wik', 'dices');
    expect(() => storedSuggestion()).toThrow();
  });
});
