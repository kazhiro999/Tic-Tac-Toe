import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { useOutsideTargetElementOnClick } from '../../hooks/useOutsideTargetElementOnClick';
import { useFocusLastFocusedElement } from './useFocusLastFocusedElement';
import { useCallback } from 'react';
import { isEscKey } from '../../functions/key';
import { designTokens } from '../../designTokens';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  popupRef: React.MutableRefObject<HTMLDivElement | null>;
  onClickDeleteButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickCancelButton: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  title: string;
  okButtonText: string;
  ngButtonText: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  focusNgButton?: boolean;
} & PropsForDataTestId;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  'data-testid': dataTestId,
  popupRef,
  onClickDeleteButton,
  onClickCancelButton,
  onKeyDown,
  title,
  okButtonText,
  ngButtonText,
  focusNgButton
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={className}
      ref={popupRef}
      onKeyDown={onKeyDown}
      data-testid={dataTestId}
    >
      <span className={`${className}__label`}>{title}</span>
      <div className={`${className}__buttonGroup`}>
        <Button
          onClick={onClickCancelButton}
          shouldFocus={focusNgButton}
          color="normal"
          size="small"
        >
          {ngButtonText}
        </Button>
        <Button onClick={onClickDeleteButton} color="delete" size="small">
          {okButtonText}
        </Button>
      </div>
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  background-color: ${designTokens.colors.snow};
  padding: 16px 8px;
  width: 210px;
  text-align: center;
  box-shadow: 0 5px 10px ${designTokens.colors.transparentBlack10};
  position: absolute;
  top: ${({ top }) => (top !== undefined ? top : '100%')};
  right: ${({ right }) => (right !== undefined ? right : 'auto')};
  bottom: ${({ bottom }) => (bottom !== undefined ? bottom : 'auto')};
  left: ${({ left }) => (left !== undefined ? left : 0)};
  z-index: ${designTokens.zIndex.popup};
  color: ${designTokens.colors.mineShaft};
  overflow-wrap: break-word;
  line-height: 1.5;
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }

  &__label {
    display: block;
    font-size: ${designTokens.fonts.size[2]};
    margin-bottom: 8px;
  }

  &__buttonGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

type OuterProps = {
  confirmDelete: () => void;
  closePopup: () => void;
  title: string;
  okButtonText: string;
  ngButtonText: string;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  focusNgButton?: boolean;
} & PropsForDataTestId;

export type ConfirmDeletePopupProps = OuterProps;

export const Container: React.VFC<OuterProps> = ({
  'data-testid': dataTestId,
  confirmDelete,
  closePopup,
  title,
  okButtonText,
  ngButtonText,
  toggleButtonRef,
  top,
  right,
  bottom,
  left,
  focusNgButton = false
}) => {
  const shouldNotFireCallback = useCallback(
    (event: MouseEvent) => {
      if (!toggleButtonRef.current) return false;
      return toggleButtonRef.current.contains(event.target as Node);
    },
    [toggleButtonRef]
  );

  const popupRef = useOutsideTargetElementOnClick<HTMLDivElement>(
    closePopup,
    shouldNotFireCallback
  );
  const focusLastFocusedElement = useFocusLastFocusedElement();

  const closePopupAndFocusLastFocusedElement = useCallback(() => {
    closePopup();
    focusLastFocusedElement();
  }, [closePopup, focusLastFocusedElement]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isEscKey(e)) {
        e.preventDefault();
        closePopupAndFocusLastFocusedElement();
      }
    },
    [closePopupAndFocusLastFocusedElement]
  );

  const handleClickCancelButton = useCallback(() => {
    closePopupAndFocusLastFocusedElement();
  }, [closePopupAndFocusLastFocusedElement]);

  const handleClickDeleteButton = useCallback(() => {
    confirmDelete();
    closePopup();
  }, [closePopup, confirmDelete]);

  return (
    <StyledComponent
      data-testid={dataTestId}
      popupRef={popupRef}
      onClickDeleteButton={handleClickDeleteButton}
      onClickCancelButton={handleClickCancelButton}
      onKeyDown={handleKeyDown}
      title={title}
      okButtonText={okButtonText}
      ngButtonText={ngButtonText}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      focusNgButton={focusNgButton}
    />
  );
};

export const ConfirmDeletePopup = Container;
