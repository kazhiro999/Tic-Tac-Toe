import { VFC, useRef, useState, ComponentProps } from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { ConfirmDeletePopup } from '..';
import { Normal } from './ConfirmDeletePopup.stories';
import { IconButton } from '../../IconButton';
import { DeleteIcon } from '../../../icons';

type ComponentPropsForTest = ComponentProps<typeof ConfirmDeletePopup> & {
  dataTestIdExternalPopup?: string;
  dataTestIdToggleButton?: string;
  dataTestIdPopup?: string;
};

const Component: VFC<ComponentPropsForTest> = ({
  dataTestIdToggleButton,
  dataTestIdPopup,
  dataTestIdExternalPopup,
  ...rest
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <IconButton
          ref={toggleButtonRef}
          alternativeText="削除"
          height={24}
          width={24}
          iconHeight={16}
          iconWidth={16}
          icon={<DeleteIcon />}
          aria-expanded={popupOpen}
          onClick={() => setPopupOpen(!popupOpen)}
          data-testid={dataTestIdToggleButton}
        />
        {popupOpen && (
          <ConfirmDeletePopup
            {...rest}
            closePopup={() => setPopupOpen(false)}
            toggleButtonRef={toggleButtonRef}
            data-testid={dataTestIdPopup}
          />
        )}
      </div>
      <div
        style={{ width: '100px', height: '100px' }}
        data-testid={dataTestIdExternalPopup}
      />
    </>
  );
};

export default {
  title: 'Components/ConfirmDeletePopup',
  component: Component
} as ComponentMeta<typeof Component>;

export const TogglePopup: ComponentStoryObj<typeof Component> = {
  ...Normal,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
};
