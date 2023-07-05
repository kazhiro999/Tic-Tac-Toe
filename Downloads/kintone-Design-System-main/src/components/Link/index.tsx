import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { PropsForDataTestId } from '../../typings/dataTestId';

type OmittedHTMLAttributes = Omit<
  HTMLAttributes<HTMLAnchorElement>,
  'href' | 'target' | 'rel'
>;

type Props = {
  className?: string;
  url: string;
  title?: string;
  shouldOpenOtherTab?: boolean;
  externalSite?: boolean;
  onTrackingEvent?: React.MouseEventHandler<HTMLAnchorElement>;
  shouldFocus?: boolean;
  // @deprecated onBlurを利用してください
  clearShouldFocus?: () => void;
  underline?: boolean;
} & PropsForDataTestId &
  OmittedHTMLAttributes;

export type LinkProps = Props;

const Component: React.VFC<Props> = ({
  children,
  className,
  url,
  title,
  shouldOpenOtherTab = false,
  externalSite = false,
  onTrackingEvent,
  shouldFocus,
  clearShouldFocus,
  'data-testid': dataTestId,
  /** ...othersにunderlineが含まれるとaタグのattrになってしまい、エラーになるので回避するために指定 */
  underline,
  ...others
}) => {
  const linkProps: Partial<{
    target: string;
    rel: string;
  }> = {};
  if (shouldOpenOtherTab) {
    linkProps.target = '_blank';
  }
  if (externalSite) {
    linkProps.rel = 'noopener noreferrer';
  }

  const aRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    if (aRef.current && shouldFocus) {
      aRef.current.focus();
      // TODO deprecatedが浸透したら削除
      if (clearShouldFocus) {
        clearShouldFocus();
      }
    }
  }, [shouldFocus, clearShouldFocus]);

  return (
    <a
      className={className}
      href={url}
      title={title}
      data-testid={dataTestId}
      onClick={onTrackingEvent}
      ref={aRef}
      {...linkProps}
      {...others}
    >
      {children}
    </a>
  );
};

export const StyledComponent: React.VFC<Props> = styled(Component)`
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
  line-height: 1.5;
  cursor: pointer;

  /* 文字色 */
  color: ${designTokens.colors.curiousBlue};
  &:hover,
  &:focus {
    color: ${designTokens.colors.darkenCuriousBlue10};
  }

  /* 下線 */
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  &:hover {
    text-decoration: underline;
  }
`;

export const Link = StyledComponent;
