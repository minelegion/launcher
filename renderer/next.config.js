module.exports = {
  images: {
    domains: ['minelegion.hu'],
  },
  webpack: (config) => Object.assign(config, {
    target: 'electron-renderer',
  }),
};
