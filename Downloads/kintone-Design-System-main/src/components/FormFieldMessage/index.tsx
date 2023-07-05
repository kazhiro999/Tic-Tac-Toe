import { designTokens } from '../../designTokens';
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';
import { TypeOfValues } from '../../typings/utilities';

const DATA_TESTID = 'shared-forms-FormField-FormFieldMessage';

export const FORM_FIELD_MESSAGE_TYPE = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;
type MessageType = TypeOfValues<typeof FORM_FIELD_MESSAGE_TYPE>;

type Props = {
  type: MessageType;
  id?: string;
  children: React.ReactNode;
};

export type FormFieldMessageProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children,
  type,
  id
}) => {
  return (
    <div
      className={clsx(className, {
        [`${className}__error`]: type === FORM_FIELD_MESSAGE_TYPE.ERROR,
        [`${className}__success`]: type === FORM_FIELD_MESSAGE_TYPE.SUCCESS
      })}
      id={id}
      data-testid={`${DATA_TESTID}-${type}`}
    >
      {children}
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  margin: 8px 0;
  padding: 4px 18px;
  font-size: ${designTokens.fonts.size[4]};
  word-wrap: break-word;
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

  &__error {
    background-color: ${designTokens.colors.cinnabar};
    color: ${designTokens.colors.snow};
  }

  &__success {
    background-color: ${designTokens.colors.olivine};
    color: ${designTokens.colors.snow};
  }
`;

export const FormFieldMessage = StyledComponent;
