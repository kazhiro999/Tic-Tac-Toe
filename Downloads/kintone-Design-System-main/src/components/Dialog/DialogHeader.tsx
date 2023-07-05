import React from 'react';
import styled from 'styled-components';
import { DialogCloseIcon } from '../../icons';
import { designTokens } from '../../designTokens';
import { IconButton } from '../IconButton';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  dialogId: string;
  title: React.ReactNode;
  onClose: () => void;
  backgroundColor?: string;
  closeButtonAlternativeText: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  dialogId,
  title,
  onClose,
  closeButtonAlternativeText
}) => {
  return (
    <div className={className}>
      <h2
        className={`${className}__title`}
        id={`${dialogId}-title`}
        data-testid="shared-Dialog-DialogHeader-title"
      >
        {title}
      </h2>
      <IconButton
        className={`${className}__closeButton`}
        alternativeText={closeButtonAlternativeText}
        width={48}
        height={48}
        iconWidth={48}
        iconHeight={48}
        icon={<DialogCloseIcon />}
        onClick={() => {
          onClose();
        }}
      />
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor || designTokens.colors.snow};
  padding-left: 24px;

  &__title {
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
    font-size: ${designTokens.fonts.size[9]};
    line-height: 1.5;
    font-weight: inherit;
    color: ${designTokens.colors.mineShaft};
    margin: 0;
  }

  &__closeButton {
    margin-right: 8px;
  }
`;

export const DialogHeader = StyledComponent;
