import {
  storeSuggestion,
  getSuggestions,
  isVerb,
  getContinousForm,
} from 'src/utils/index';
import store from 'store2';
import mockedData from '@/test/mockedData.json';
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
  it('Should throw error WHEN failed to add new suggestion', () => {
    const storedSuggestion = () => storeSuggestion('wik', 'dices');
    expect(() => storedSuggestion()).toThrow();
  });
});

describe('Conjugated Forms', () => {
  it("Should return true WHEN query is a verb 'go'", () => {
    const go = isVerb(mockedData.wikiResponse);
    expect(go).toBe(true);
  });
  it("Should return continous form 'going'", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const going = await getContinousForm(mockedData.conjugatedFormsResponse);
    expect(going).toBe('going');
  });
  //--------------------------------------
});
