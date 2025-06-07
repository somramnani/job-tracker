module.exports = {
  createConnection: jest.fn(() => ({
    connect: jest.fn((cb) => cb(null)), // simulate success
    query: jest.fn(), // stubbed query method
  })),
};
