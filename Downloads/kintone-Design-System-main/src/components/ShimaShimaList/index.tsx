import React from 'react';
import styled from 'styled-components';
import { ShimaShimaListItem } from './ShimaShimaListItem';
import { useComponentId } from '../../hooks/useComponentId';
import { MoreButton } from './MoreButton';
import {
  ShimaShimaListMoreButtonLayout,
  ShimaShimaListMoreButtonLayoutType
} from './modules/types';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  shouldShowMoreButton: boolean;
  onClickMoreButton: React.MouseEventHandler<HTMLButtonElement>;
  moreButtonListItemHeight: string;
  moreButtonLabel: string;
  moreButtonLayout: ShimaShimaListMoreButtonLayoutType;
  children: React.ReactNode;
};

export type ShimaShimaListProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  shouldShowMoreButton,
  onClickMoreButton,
  moreButtonListItemHeight,
  moreButtonLabel,
  moreButtonLayout = ShimaShimaListMoreButtonLayout.LEFT,
  children,
  className
}) => {
  const componentId = useComponentId();

  return (
    <ul className={className}>
      {React.Children.map(children, (child, i) => (
        <ShimaShimaListItem key={`${componentId}-ShimaShimaListItem-${i}`}>
          {child}
        </ShimaShimaListItem>
      ))}
      {shouldShowMoreButton && (
        <ShimaShimaListItem>
          <MoreButton
            onClick={onClickMoreButton}
            label={moreButtonLabel}
            height={moreButtonListItemHeight}
            layout={moreButtonLayout}
          />
        </ShimaShimaListItem>
      )}
    </ul>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ShimaShimaList = StyledComponent;
