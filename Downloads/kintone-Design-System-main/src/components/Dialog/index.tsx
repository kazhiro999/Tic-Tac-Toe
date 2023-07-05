import * as React from 'react';
import styled from 'styled-components';
import { Overlay } from './Overlay';
import { Scale } from './Scale';
import { useFocusControl } from './useFocusControl';
import { usePreventTextReadAloudForBodyChildren } from './usePreventTextReadAloudForBodyChildren';
import { createPortal } from 'react-dom';
import { isEscKey } from '../../functions/key';
import { designTokens } from '../../designTokens';
import { DialogHeader } from './DialogHeader';
import { useComponentId } from '../../hooks/useComponentId';
import { DialogTitleWithIcon } from './DialogTitleWithIcon';
import { AppWarningIcon } from '../../icons';
import { PropsForDataTestId } from '../../typings/dataTestId';
import { PropsForStyled } from '../../typings/propsForStyled';

type Variant = 'normal' | 'warning';

type Props = PropsForDataTestId & {
  open: boolean;
  onClose: () => void;
  variant?: Variant;
  dialogTitle: React.ReactNode;
  headerBackgroundColor?: string;
  headerCloseButtonAlternativeText: string;
  maxWidth?: number;
  children: React.ReactNode;
};

export type DialogProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className,
  'data-testid': dataTestId,
  open,
  onClose,
  variant = 'normal',
  dialogTitle,
  headerBackgroundColor,
  headerCloseButtonAlternativeText
}) => {
  const dialogId = useComponentId();

  const [
    dialogRef,
    dialogEndRef,
    focusOnDialogEndWhenKeyDown,
    focusOnDialogWhenFocus
  ] = useFocusControl(open);
  const ref = usePreventTextReadAloudForBodyChildren(open, dialogId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isEscKey(e)) {
      e.preventDefault();
      onClose();
      return;
    }
    focusOnDialogEndWhenKeyDown(e);
  };

  if (!open) {
    return null;
  }

  const warningDialogTitle = (
    <DialogTitleWithIcon
      title={dialogTitle}
      icon={<AppWarningIcon />}
      alternativeText=""
      width={20}
      height={20}
    />
  );

  return createPortal(
    <div ref={ref} data-testid={dataTestId}>
      <Overlay>
        <Scale>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <div
            className={className}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            ref={dialogRef}
            onKeyDown={handleKeyDown}
          >
            <DialogHeader
              dialogId={dialogId}
              title={variant === 'warning' ? warningDialogTitle : dialogTitle}
              onClose={onClose}
              closeButtonAlternativeText={headerCloseButtonAlternativeText}
              backgroundColor={headerBackgroundColor}
            />
            {children}
            <span
              // ダイアログ内のフォーカスループを実現するために、フォーカスが当たる最後の要素として空のspanタグを追加している。
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              ref={dialogEndRef}
              aria-hidden
              onFocus={focusOnDialogWhenFocus}
            />
          </div>
        </Scale>
      </Overlay>
    </div>,
    document.body
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  flex-direction: column;
  // backgroundを指定しないとDialog裏側のOverlayが透けて見えてしまう場合がある
  // https://github.com/kintone-private/kintone-Design-System/pull/1065#issuecomment-1357126559
  background: ${designTokens.colors.snow};
  min-width: 400px;
  max-height: 100vh;
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px`};
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
  font-size: ${designTokens.fonts.size[5]};
  color: ${designTokens.colors.mineShaft};
  line-height: 1.5;
`;

export const Dialog = StyledComponent;
