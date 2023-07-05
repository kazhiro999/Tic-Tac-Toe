const StyleDictionary = require('style-dictionary');
const {
  fileHeader,
  getTypeScriptType
} = require('style-dictionary/lib/common/formatHelpers');

module.exports = {
  source: ['src/designTokens/_transformedTokens.json'],
  platforms: {
    'css/variables': {
      transformGroup: 'css',
      files: [
        {
          destination: 'src/designTokens/_tokens.css',
          format: 'css/variables'
        }
      ]
    },
    typescript: {
      transformGroup: 'js',
      files: [
        {
          format: 'ts/object',
          destination: 'src/designTokens/_tokens.ts'
        }
      ]
    }
  }
};

StyleDictionary.registerFormat({
  name: 'ts/object',
  formatter: function ({ dictionary, file }) {
    return (
      fileHeader({ file }) +
      'export const tokens = ' +
      JSON.stringify(dictionary.tokens, null, 2) +
      ';'
    );
  }
});
