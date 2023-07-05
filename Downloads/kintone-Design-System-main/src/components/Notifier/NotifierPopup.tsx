import * as React from 'react';
import styled from 'styled-components';
import { IconButton } from '../IconButton';
import { sanitize } from '../../functions/sanitizer';
import { designTokens } from '../../designTokens';
import { Center } from '../Center';
import { NotifierCloseIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  type: 'error' | 'success' | 'info';
  title: string;
  messageLines: string[];
  onClose: () => void;
  closeButtonAltText: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  type,
  title,
  messageLines,
  onClose,
  closeButtonAltText,
  className
}) => {
  return (
    <Center vertical={false} horizontal>
      <div
        className={`${className} ${className}__${type}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={`${className}__header`}>
          {title && <div className={`${className}__title`}>{title}</div>}
          <ul>
            {messageLines.map((message, index) => (
              <li
                key={`${index}-message`}
                dangerouslySetInnerHTML={{
                  __html: sanitize(message)
                }}
              />
            ))}
          </ul>
        </div>
        <IconButton
          className={`${className}__closeButton`}
          alternativeText={closeButtonAltText}
          width={48}
          height={48}
          iconWidth={48}
          iconHeight={48}
          icon={<NotifierCloseIcon />}
          onClick={onClose}
        />
      </div>
    </Center>
  );
};

export const StyledComponent: React.VFC<Props> = styled(Component)`
  min-width: 300px;
  max-width: 80%;
  margin-top: 16px;
  pointer-events: auto;
  display: flex;
  justify-content: space-between;

  &__error {
    background-color: ${designTokens.colors.cinnabar};
  }
  &__success {
    background-color: ${designTokens.colors.olivine};
  }
  &__info {
    background-color: ${designTokens.colors.curiousBlue};
  }

  &__header {
    padding: 16px 8px 16px 24px;
    color: ${designTokens.colors.snow};
    text-shadow: 1px -1px 0 ${designTokens.colors.transparentBlack50};
    word-wrap: break-word;
    font-size: ${designTokens.fonts.size[5]};
    line-height: 1.5;
    font-weight: 700;

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

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        margin: 0;
        padding: 0;
      }
    }

    a {
      color: ${designTokens.colors.snow};
      text-decoration: underline;
      cursor: pointer;
    }

    a:hover {
      color: ${designTokens.colors.snow};
      opacity: 0.8;
    }

    a:focus {
      color: ${designTokens.colors.snow};
    }
  }

  &__closeButton {
    flex-shrink: 0;
    margin-top: 5px;
  }
`;

export const NotifierPopup = StyledComponent;
