import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FormFieldMessage, FORM_FIELD_MESSAGE_TYPE } from '..';

export default {
  title: 'Components/FormFieldMessage/test',
  component: FormFieldMessage
} as ComponentMeta<typeof FormFieldMessage>;

export const LongMessage: ComponentStoryObj<typeof FormFieldMessage> = {
  args: {
    type: FORM_FIELD_MESSAGE_TYPE.ERROR,
    children:
      '長いメッセージの場合、折り返されます。長いメッセージの場合、折り返されます。長いメッセージの場合、折り返されます。長いメッセージの場合、折り返されます。長いメッセージの場合、折り返されます。長いメッセージの場合、折り返されます。'
  }
};
