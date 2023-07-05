import { useEffect, useState } from 'react';
import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import clsx from 'clsx';
import { TypeOfValues } from '../../typings/utilities';
import { PropsForStyled } from '../../typings/propsForStyled';

const VISIBILITY = {
  SHOWING: 'SHOWING',
  SHOWN: 'SHOWN',
  HIDING: 'HIDING',
  HIDDEN: 'HIDDEN'
} as const;
type Visibility = TypeOfValues<typeof VISIBILITY>;

type Props = {
  open: boolean;
  notificationId: number | null;
  children: React.ReactNode;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  children,
  className,
  open,
  notificationId
}) => {
  const [visibility, setVisibility] = useState<Visibility>(VISIBILITY.HIDDEN);

  useEffect(() => {
    // Notifierを一度も表示していない
    if (notificationId === null) {
      setVisibility(VISIBILITY.HIDDEN);
      return;
    }

    // Notifierの表示/非表示が変わった、または次のNotifierが登録されたときに再表示
    if (open) {
      setVisibility(VISIBILITY.SHOWING);
    } else {
      setVisibility(VISIBILITY.HIDING);
    }
  }, [notificationId, open]);

  const handleAnimationEnd = () => {
    if (open) {
      setVisibility(VISIBILITY.SHOWN);
    } else {
      setVisibility(VISIBILITY.HIDDEN);
    }
  };

  if (visibility === VISIBILITY.HIDDEN) {
    return null;
  }
  return (
    <div
      className={clsx([className], {
        [`${className}__showing`]: visibility === VISIBILITY.SHOWING,
        [`${className}__hiding`]: visibility === VISIBILITY.HIDING
      })}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

const showAnimation = keyframes`
  from {
    transform: translateY(-150%);
  }

  to {
    transform: translateY(0);
  }
`;

const hideAnimation = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-150%);
  }
`;

const StyledComponent: React.VFC<Props> = styled(Component)`
  &__showing {
    animation: ${showAnimation} 250ms ease-out;
  }

  &__hiding {
    animation: ${hideAnimation} 250ms ease-out;
  }
`;

export const NotifierSlide = StyledComponent;
