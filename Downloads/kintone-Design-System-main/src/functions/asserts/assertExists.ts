import { isDevelopmentBuild } from '../isDevelopmentBuild';

const ERROR_MESSAGE = 'Expected to exist value of not null or undefined.';

type AssertExists = <T>(value: T) => asserts value is NonNullable<T>;

/**
 * 引数が null または undefined ではないことを保証する
 */
export const assertExists: AssertExists = (value) => {
  if (
    isDevelopmentBuild() &&
    (typeof value === 'undefined' || value === null)
  ) {
    throw new Error(ERROR_MESSAGE);
  }
};

export const visibleForTesting = {
  ERROR_MESSAGE
};
