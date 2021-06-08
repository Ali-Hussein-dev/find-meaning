const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

module.exports = withPlugins([
  [withPWA({ future: { webpack5: true }, pwa: { dest: 'public' } })],
]);
