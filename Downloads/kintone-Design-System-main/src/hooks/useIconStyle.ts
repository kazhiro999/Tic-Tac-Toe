import { useMemo, useState } from 'react';

export const useIconStyle = <T extends Element = Element>({
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur
}: {
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
} = {}) => {
  const [hasFocused, setHasFocused] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);

  const handlers = useMemo<{
    onMouseEnter: React.MouseEventHandler<T>;
    onMouseLeave: React.MouseEventHandler<T>;
    onFocus: React.FocusEventHandler<T>;
    onBlur: React.FocusEventHandler<T>;
  }>(
    () => ({
      onMouseEnter: (...args) => {
        setHasHovered(true);
        return onMouseEnter?.(...args);
      },
      onMouseLeave: (...args) => {
        setHasHovered(false);
        return onMouseLeave?.(...args);
      },
      onFocus: (...args) => {
        setHasFocused(true);
        return onFocus?.(...args);
      },
      onBlur: (...args) => {
        setHasFocused(false);
        return onBlur?.(...args);
      }
    }),
    [onBlur, onFocus, onMouseEnter, onMouseLeave]
  );

  return {
    isHoveredStyle: hasFocused || hasHovered,
    handlers
  } as const;
};
