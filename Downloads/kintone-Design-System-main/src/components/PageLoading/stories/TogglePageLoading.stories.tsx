import { PageLoading } from '..';
import { useState } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

const Component = () => {
  const [shown, setShown] = useState(false);

  return (
    <>
      <button onClick={() => setShown(!shown)}>Load</button>
      <PageLoading shown={shown} />
    </>
  );
};

export default {
  title: 'Components/PageLoading',
  component: Component
} as ComponentMeta<typeof Component>;

export const TogglePageLoading: ComponentStoryObj<typeof Component> = {
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
