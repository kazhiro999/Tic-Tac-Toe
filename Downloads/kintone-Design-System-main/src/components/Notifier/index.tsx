import { useEffect } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { NotifierSlide } from './NotifierSlide';
import { designTokens } from '../../designTokens';
import { NotifierPopup } from './NotifierPopup';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  type: 'error' | 'success' | 'info';
  shown: boolean;
  notificationId: number | null;
  title: string;
  messageLines: string[];
  autoClose: boolean;
  onClose: () => void;
  closeButtonAltText: string;
};

export type NotifierProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  shown,
  notificationId,
  title,
  messageLines,
  autoClose,
  onClose,
  type,
  closeButtonAltText
}) => {
  useEffect(() => {
    // autoCloseがtrueのときは、7秒経ったらNotifierを自動で閉じる
    let intervalId: number | null = null;
    if (autoClose) {
      intervalId = window.setTimeout(onClose, 7000);
    }
    return () => {
      if (intervalId !== null) {
        window.clearTimeout(intervalId);
      }
    };
  }, [autoClose, onClose]);

  return (
    <div className={className}>
      <NotifierSlide open={shown} notificationId={notificationId}>
        <NotifierPopup
          title={title}
          messageLines={messageLines}
          onClose={onClose}
          type={type}
          closeButtonAltText={closeButtonAltText}
        />
      </NotifierSlide>
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: ${designTokens.zIndex.notifier};
  width: 100%;
  pointer-events: none;
`;

export const Notifier = StyledComponent;
