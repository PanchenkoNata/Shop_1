module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/shop_1',
    connect: {
      config: {
        autoIndex: true,
      },
      useNewUrlParser: true,
    },
  },
};
