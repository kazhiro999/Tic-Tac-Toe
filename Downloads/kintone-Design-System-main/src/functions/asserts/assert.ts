import { isDevelopmentBuild } from '../isDevelopmentBuild';

type Assert = (value: unknown) => asserts value;

const ERROR_MESSAGE = 'Expected value to be truthy but it is falsy';

export const assert: Assert = (value) => {
  if (isDevelopmentBuild() && !value) {
    throw new Error(ERROR_MESSAGE);
  }
};

export const visibleForTesting = {
  ERROR_MESSAGE
};
