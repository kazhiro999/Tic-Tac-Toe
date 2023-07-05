module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
  testEnvironment: 'jsdom',
  testRegex: '(.(test).(ts|tsx))$',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '\\.mdx?$': '<rootDir>/__mocks__/mdxMock.js'
  }
};
