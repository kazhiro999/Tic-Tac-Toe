import * as React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  children: React.ReactNode;
};

/**
 * 画面上は見えないがスクリーンリーダーで読み上げられる要素に与えるスタイル。
 * 内容は、Salesforce Lightning Design System の .slds-assistive-text を参考にしている。
 * https://github.com/salesforce-ux/design-system/blob/winter-16/ui/utilities/visibility/flavors/assistive-text/index.scss
 *
 * 画面上は見えないがスクリーンリーダーで読み上げられる要素に与えるスタイルについては、
 * 以下の記事に詳細が書かれている:
 * http://webaim.org/techniques/css/invisiblecontent/
 */
const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children
}) => {
  if (React.isValidElement<{ className: string }>(children)) {
    const childClassName = children.props.className;
    return React.cloneElement(children, {
      className: `${clsx(`${className}__assistive-text`, {
        [`${childClassName}`]: childClassName
      })}`
    });
  }
  throw new Error('The children are not React Elements');
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  &__assistive-text {
    position: absolute !important;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0 !important;
    border: 0 !important;
    height: 1px !important;
    width: 1px !important;
    overflow: hidden;
  }
`;

export const AssistiveText = StyledComponent;
