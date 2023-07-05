import remarkGfm from 'remark-gfm';

export default {
  stories: [
    '../src/**/*.mdx',
    '../src/components/**/stories/*.stories.*',
    '../src/icons/**/stories/*.stories.*'
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false
      }
    },
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm]
          }
        }
      }
    },
    '@storybook/addon-interactions',
    'storybook-addon-pseudo-states'
  ],
  framework: '@storybook/react-vite'
};
