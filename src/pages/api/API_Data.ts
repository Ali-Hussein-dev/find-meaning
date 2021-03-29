// export const owlbot = {
//   baseUrl: 'https://owlbot.info/api/v4/dictionary/',
//   headers: {
//     Authorization: process.env.OWLBOT_TOKEN,
//   },
//   getUrl(query: string): string | never {
//     if (!query) {
//       throw new Error('query is not defind');
//     }
//     return `${this.baseUrl}${query}`;
//   },
// };
// export const lingua = {
//   baseUrl: 'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/',
//   headers: {
//     'x-rapidapi-key': process.env.RAPIDAPI_KEY,
//     'x-rapidapi-host': process.env.LINGUA_HOST,
//   },
//   getUrl(query: string): string | never {
//     if (!query) {
//       throw new Error('query is not defind');
//     }
//     return `${this.baseUrl}${query}`;
//   },
// };
// example
//'http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5'
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
    readonly 'x-rapidapi-key': string;
    'x-rapidapi-host': string;
  };
  constructor(baseUrl: string, host: string) {
    this.baseUrl = baseUrl;
    this.headers = {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
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
