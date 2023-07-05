import { useIconStyle } from '../useIconStyle';

import { act, renderHook, RenderHookResult } from '@testing-library/react';

describe('useIconStyle', () => {
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();
  const onFocus = jest.fn();
  const onBlur = jest.fn();
  let hooksResult: RenderHookResult<ReturnType<typeof useIconStyle>, unknown>;

  beforeEach(() => {
    jest.resetAllMocks();
    hooksResult = renderHook(() =>
      useIconStyle({ onMouseEnter, onMouseLeave, onFocus, onBlur })
    );
  });

  it('onMouseEnterを呼び出すとisHoverStyleがtrueになり、onMouseLeaveでfalseになる', () => {
    // @ts-ignore
    const dummyMouseEvent: React.MouseEvent = {};

    expect(hooksResult.result.current.isHoveredStyle).toBe(false);
    act(() => {
      hooksResult.result.current.handlers.onMouseEnter(dummyMouseEvent);
    });

    expect(hooksResult.result.current.isHoveredStyle).toBe(true);
    expect(onMouseEnter).toHaveBeenCalledWith(dummyMouseEvent);

    act(() => {
      hooksResult.result.current.handlers.onMouseLeave(dummyMouseEvent);
    });

    expect(hooksResult.result.current.isHoveredStyle).toBe(false);
    expect(onMouseLeave).toHaveBeenCalledWith(dummyMouseEvent);
  });

  it('onFocusを呼び出すとisHoverStyleがtrueになり、onBlurでfalseになる', () => {
    // @ts-ignore
    const dummyFocusEvent: React.FocusEvent = {};

    expect(hooksResult.result.current.isHoveredStyle).toBe(false);
    act(() => {
      hooksResult.result.current.handlers.onFocus(dummyFocusEvent);
    });

    expect(hooksResult.result.current.isHoveredStyle).toBe(true);
    expect(onFocus).toHaveBeenCalledWith(dummyFocusEvent);

    act(() => {
      hooksResult.result.current.handlers.onBlur(dummyFocusEvent);
    });

    expect(hooksResult.result.current.isHoveredStyle).toBe(false);
    expect(onBlur).toHaveBeenCalledWith(dummyFocusEvent);
  });
});
