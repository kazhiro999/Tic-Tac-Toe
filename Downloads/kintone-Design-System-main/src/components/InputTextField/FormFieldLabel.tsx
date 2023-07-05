import clsx from 'clsx';
import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  id?: string;
  required?: boolean;
  children: React.ReactNode;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children,
  id,
  required = false
}) => {
  return (
    // フィールドの種類によってはlabelタグを利用できないのでspanタグで実装
    // https://github.dev.cybozu.co.jp/kintone/kintone/issues/18331
    <span
      id={id}
      className={clsx(className, {
        [`${className}__required`]: required
      })}
    >
      {children}
    </span>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: inline-block;
  font-size: ${designTokens.fonts.size[4]};
  line-height: 1.5;
  margin-bottom: 8px;
  color: ${designTokens.colors.mineShaft};

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

  &__required {
    &::after {
      content: '*';
      color: ${designTokens.colors.cinnabar};
      font-size: ${designTokens.fonts.size[7]};
      margin-left: 4px;
      vertical-align: -3px;
      line-height: 1;
    }
  }
`;

export const FormFieldLabel = StyledComponent;
