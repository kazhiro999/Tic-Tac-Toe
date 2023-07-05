import { styled } from '@storybook/theming';
import React, { useRef, useState } from 'react';
import {
  FocusContextProvider,
  useFocus,
  useChangeFocus
} from '../FocusContext';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Focus',
  parameters: {
    backgrounds: {
      default: 'white'
    }
  }
};

type Props = {
  value: 1 | 2 | 3 | 4;
};

const Component: React.VFC<Props> = ({ value }) => {
  const [flag, setFlag] = useState(false);

  const { changeFocus } = useChangeFocus();

  const ref = useRef<HTMLInputElement | null>(null);

  useFocus(`ITEM_${value}`, ref);

  useFocus(`ITEM_${value}`, () => {
    setFlag(!flag);
  });

  const onClick = () => {
    changeFocus(`ITEM_${value}`);
  };

  return (
    <Div>
      <Input
        type="text"
        value={value}
        ref={ref}
        onChange={action('onChange')}
      />
      <Button onClick={onClick}>focus</Button>
      <span>{flag ? '🔔' : ''}</span>
    </Div>
  );
};

export const Normal = () => {
  return (
    <FocusContextProvider>
      <Component value={1} />
      <Component value={2} />
      <Component value={3} />
      <Component value={4} />
    </FocusContextProvider>
  );
};

const Input = styled.input<Props>`
  padding: 10px;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #0072bf;
  cursor: pointer;
`;
