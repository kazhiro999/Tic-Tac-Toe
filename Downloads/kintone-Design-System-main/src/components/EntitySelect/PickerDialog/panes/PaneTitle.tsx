import * as React from 'react';
import styled from 'styled-components';
import { AssistiveText } from '../../../a11y/AssistiveText';
import { PropsForStyled } from '../../../../typings/propsForStyled';

type Props = {
  title: string;
  id: string;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  title,
  id,
  className
}) => {
  return (
    <AssistiveText>
      <h3 id={id} className={`${className}__title`}>
        {title}
      </h3>
    </AssistiveText>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  &__title {
    font-size: inherit;
    font-weight: inherit;
  }
`;

export const PaneTitle = StyledComponent;
