let ignoreComponentNames: string[] = [];
const originalConsoleError = global.console.error;

export const ignoreReactActWarning = (...componentNames: string[]) => {
  ignoreComponentNames = componentNames;

  jest.spyOn(global.console, 'error').mockImplementation((...v) => {
    const regExp = new RegExp(ignoreComponentNames.join('|'));
    if (
      typeof v[0] === 'string' &&
      typeof v[1] === 'string' &&
      v[0].match('https://reactjs.org/link/wrap-tests-with-act') &&
      // 対応できていないコンポーネント群
      v[1].match(regExp)
    ) {
      // Warning: An update to XXXX inside a test was not wrapped in act(...).
    } else {
      originalConsoleError.call(global.console, ...v);
    }
  });

  return () => {
    global.console.error = originalConsoleError;
  };
};

export const addIgnoreComponentNames = (...componentNames: string[]) => {
  ignoreComponentNames = ignoreComponentNames.concat(componentNames);
  console.log('addIgnoreComponentNames', ignoreComponentNames);
  return () => {
    ignoreComponentNames = ignoreComponentNames.filter(
      (name) => !componentNames.some((n) => n === name)
    );
    console.log('refresh IgnoreComponentNames', ignoreComponentNames);
  };
};
