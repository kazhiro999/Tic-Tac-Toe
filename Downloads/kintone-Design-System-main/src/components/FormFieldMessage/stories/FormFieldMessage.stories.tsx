import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FormFieldMessage, FORM_FIELD_MESSAGE_TYPE } from '../';

export default {
  title: 'Components/FormFieldMessage',
  component: FormFieldMessage
} as ComponentMeta<typeof FormFieldMessage>;

type storyType = ComponentStoryObj<typeof FormFieldMessage>;

export const Error: storyType = {
  args: {
    type: FORM_FIELD_MESSAGE_TYPE.ERROR,
    children: 'エラー'
  }
};

export const Success: storyType = {
  args: {
    type: FORM_FIELD_MESSAGE_TYPE.SUCCESS,
    children: '成功'
  }
};
