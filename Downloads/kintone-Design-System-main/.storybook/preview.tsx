import React, { StrictMode } from 'react';

export const decorators = [
  (Story) => {
    return (
      <StrictMode>
        <Story />
      </StrictMode>
    );
  }
];

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        'gettingStarted',
        '*',
        'designTokens',
        'Components',
        'Components/*/test'
      ]
    }
  }
};
