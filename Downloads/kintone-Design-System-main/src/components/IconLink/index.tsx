import { AriaAttributes } from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { Icon } from '../Icon';
import { useIconStyle } from '../../hooks/useIconStyle';
import { PropsForDataTestId } from '../../typings/dataTestId';

type Props = {
  className?: string;
  alternativeText: string;
  width: number;
  height: number;
  iconWidth: number;
  iconHeight: number;
  icon?: React.ReactNode;
  iconUrl?: string;
  url: string;
  // https://github.com/kintone-private/kintone-Design-System/issues/814 の経緯により実装
  onTrackingEvent?: React.MouseEventHandler<HTMLAnchorElement>;
  onFocus: React.FocusEventHandler<HTMLAnchorElement>;
  onBlur: React.FocusEventHandler<HTMLAnchorElement>;
  onMouseEnter: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave: React.MouseEventHandler<HTMLAnchorElement>;
  shouldOpenOtherTab?: boolean;
  externalSite?: boolean;
  aRef: React.RefObject<HTMLAnchorElement>;
} & AriaAttributes &
  PropsForDataTestId;

const Component: React.VFC<Props> = ({
  className,
  alternativeText,
  width,
  height,
  iconWidth,
  iconHeight,
  icon,
  iconUrl,
  url,
  shouldOpenOtherTab,
  externalSite,
  'data-testid': dataTestId,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  aRef,
  onTrackingEvent,
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

  return (
    <a
      onClick={onTrackingEvent}
      className={className}
      data-testid={dataTestId}
      href={url}
      title={alternativeText}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={aRef}
      {...others}
      {...linkProps}
    >
      <Icon
        alternativeText={alternativeText}
        width={iconWidth}
        height={iconHeight}
        icon={icon}
        iconUrl={iconUrl}
      />
    </a>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  display: flex;
  align-items: center;
  justify-content: center;
`;

type OuterProps = {
  className?: string;
  alternativeText: string;
  width: number;
  height: number;
  iconWidth: number;
  iconHeight: number;
  icon?: React.ReactNode;
  iconUrl?: string;
  hoverIcon?: React.ReactNode;
  hoverIconUrl?: string;
  url: string;
  shouldOpenOtherTab?: boolean;
  externalSite?: boolean;
  shouldFocus?: boolean;
  onTrackingEvent?: React.MouseEventHandler<HTMLAnchorElement>;
  // @deprecated onBlurを利用してください
  clearShouldFocus?: () => void;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>;
} & AriaAttributes &
  PropsForDataTestId;

export type IconLinkProps = OuterProps;

const Container: React.VFC<OuterProps> = ({
  shouldFocus,
  clearShouldFocus,
  iconUrl,
  hoverIconUrl,
  icon,
  hoverIcon,
  ...others
}) => {
  const { isHoveredStyle, handlers } = useIconStyle();

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
    <StyledComponent
      icon={isHoveredStyle && hoverIcon ? hoverIcon : icon}
      iconUrl={isHoveredStyle && hoverIconUrl ? hoverIconUrl : iconUrl}
      aRef={aRef}
      {...handlers}
      {...others}
    />
  );
};

export const IconLink = Container;
