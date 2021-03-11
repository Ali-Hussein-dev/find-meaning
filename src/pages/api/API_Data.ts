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
export const lingua = {
  baseUrl: 'https://lingua-robot.p.rapidapi.com/language/v1/entries/en/',
  headers: {
    'x-rapidapi-key': process.env.LINGUA_KEY,
    'x-rapidapi-host': process.env.LINGUA_HOST,
  },
  getUrl(query: string): string | never {
    if (!query) {
      throw new Error('query is not defind');
    }
    return `${this.baseUrl}${query}`;
  },
};
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
