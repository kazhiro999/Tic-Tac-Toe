import React, { useCallback, useState } from 'react';
import { EntitySelect } from '..';
import { EntitySelectValue, ENTITY_SELECT_OTHER_TYPE } from '../modules/types';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { defaultLocales } from '../EntitySelectContext';
import { repositories } from './data';
import { UserSelectPickerButtonIcon } from '../../../icons';
import { Entity } from '../../../models/entity';

type Props = React.ComponentProps<typeof EntitySelect>;
const Component: React.FC<Props> = ({
  values: initialValues,
  changeValues,
  ...rest
}) => {
  const [values, setValues] = useState<EntitySelectValue[]>(initialValues);
  const handleChangeValue = useCallback(
    (v: EntitySelectValue[]) => {
      setValues(v);
      changeValues(v);
    },
    [changeValues]
  );
  return (
    <EntitySelect values={values} changeValues={handleChangeValue} {...rest} />
  );
};

export default {
  component: Component,
  title: 'Components/EntitySelect⚠️',
  argTypes: { changeValues: { action: 'changeValues' } }
} as ComponentMeta<typeof Component>;

type StoryType = ComponentStoryObj<typeof Component>;

export const NormalWithMultipleSelect: StoryType = {
  args: {
    placeholder: 'エンティティを追加',
    pickerIconComponent: <UserSelectPickerButtonIcon />,
    pickerDialogTitle: 'ユーザーを選択',
    locales: defaultLocales,
    repositories,
    values: [],
    userAvailable: true,
    groupAvailable: true,
    organizationAvailable: true,
    otherTypes: [ENTITY_SELECT_OTHER_TYPE.APP_CREATOR],
    getDisplayName: (entity: Entity) => entity.name,
    getLabelAddButton: (count) => {
      if (count && count > 0) {
        return `追加（${count}）`;
      }
      return '追加';
    },
    // KLOG-5698対応
    // 省略表示の提供を終了するときは次の行を削除すること
    wrapEntityLabel: false
  }
};

export const NormalWithSingleSelect: StoryType = {
  args: {
    ...NormalWithMultipleSelect.args,
    multipleSelection: false
  }
};

// KLOG-5698の動作確認用
// TODO: 省略表示の提供を終了するときは、このストーリーを削除すること（他のストーリーが折り返し表示になる）
export const WrapEntityLabel: StoryType = {
  args: {
    ...NormalWithMultipleSelect.args,
    wrapEntityLabel: true
  }
};
