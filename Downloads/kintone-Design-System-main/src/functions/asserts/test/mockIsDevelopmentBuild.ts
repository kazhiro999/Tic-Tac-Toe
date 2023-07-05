import * as buildOptions from '../../isDevelopmentBuild';

export const mockIsDevelopmentBuild = (isDevelopmentBuild: boolean) => {
  jest
    .spyOn(buildOptions, 'isDevelopmentBuild')
    .mockReturnValue(isDevelopmentBuild);
};
