import React, { useCallback } from 'react';
import { useMenuPopupContext } from './context/useMenuPopupContext';

export const useHandleClickMenuItem = <T extends HTMLElement>(
  onClick?: React.MouseEventHandler<T>
) => {
  const { closeMenu } = useMenuPopupContext();

  return useCallback<React.MouseEventHandler<T>>(
    (...args) => {
      closeMenu();
      onClick?.(...args);
    },
    [closeMenu, onClick]
  );
};
