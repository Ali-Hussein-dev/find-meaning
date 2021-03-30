export const giphy = {
  baseUrl: 'http://api.giphy.com/v1/gifs/search?q=',
  key: process.env.GIPHY_SDK_KEY,
  getUrl(query: string): string | never {
    if (!query) {
      throw new Error('query is not defind');
    }
    return `${this.baseUrl}${query}&api_key=${this.key}&limit=10`;
  },
};

export class DictionaryReqObj {
  baseUrl: string;
  headers: {
    'x-rapidapi-key': string;
    'x-rapidapi-host': string;
  };
  constructor(baseUrl: string, host: string, key: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'x-rapidapi-key': key,
      'x-rapidapi-host': host,
    };
  }
  getUrl(query: string): string | never {
    if (typeof query !== 'string') {
      throw new Error('getUrl-error: typeof query is not string');
    } else if (query.length === 0) {
      throw new Error('getUrl-error: query string is empty');
    }
    return `${this.baseUrl}${query}`;
  }
}
