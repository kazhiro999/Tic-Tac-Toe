import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tooltip } from '..';
import { TooltipHelpIcon } from '../../../icons';
import { IconButton } from '../../IconButton';

const Component = () => {
  const [shown, setShown] = useState(false);

  const toggleTooltip = () => setShown(!shown);

  const handleMouseEnter = () => setShown(true);

  const handleMouseLeave = () => setShown(false);

  return (
    <div style={{ position: 'relative' }}>
      <IconButton
        alternativeText="ヒント"
        height={16}
        width={16}
        iconHeight={16}
        iconWidth={16}
        icon={<TooltipHelpIcon />}
        onClick={toggleTooltip}
        aria-expanded={shown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {shown && (
        <Tooltip
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          ツールチップの内容
        </Tooltip>
      )}
    </div>
  );
};

export default {
  title: 'Components/Tooltip',
  component: Component
} as ComponentMeta<typeof Component>;

export const ToggleTooltip: ComponentStoryObj<typeof Component> = {
  parameters: {
    chromatic: { disableSnapshot: true }
  }
};
