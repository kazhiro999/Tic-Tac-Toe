import * as React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../../designTokens';
import { SearchResultContent } from '../modules/types';
import clsx from 'clsx';
import { PHOTO_SIZE } from '../../../models/user';
import { EntitySelectContext } from '../EntitySelectContext';
import { EntityIcon } from '../EntityIcon';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = OuterProps & {
  name: string;
  wrapEntityLabel: boolean;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  searchResultContent,
  highlighted,
  onClick,
  name,
  wrapEntityLabel
}) => (
  <li
    className={clsx(className, {
      [`${className}__highlighted`]: highlighted,
      // KLOG-5698対応
      // TODO: 省略表示の提供を終了するときは、次の行を削除する
      [`${className}__ellipsis`]: !wrapEntityLabel
    })}
    role="presentation"
    onClick={onClick}
  >
    <button
      id={searchResultContent.itemId}
      className={`${className}__button`}
      type="button"
      tabIndex={-1}
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="option"
      // aria-selected="false"を明示的に指定しないと、ハイライトされている項目が「選択中」と読み上げられてしまう。
      // 参考: https://github.com/kintone-private/kintone-Design-System/issues/893
      aria-selected={false}
    >
      <EntityIcon
        alternativeText=""
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときは、サイズを32にする
        width={wrapEntityLabel ? 32 : 48}
        height={wrapEntityLabel ? 32 : 48}
        entity={searchResultContent}
        photoSize={wrapEntityLabel ? PHOTO_SIZE.SIZE_32 : PHOTO_SIZE.SIZE_48}
      />
      <span
        className={`${className}__name`}
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときはtitle属性を削除する
        title={wrapEntityLabel ? undefined : name}
      >
        {name}
      </span>
    </button>
  </li>
);

const StyledComponent: React.VFC<Props> = styled(Component)`
  border-bottom: 1px solid ${designTokens.colors.porcelain};
  margin: 0;
  padding: 8px 12px;
  background-color: ${designTokens.colors.aquaHaze};

  &:hover,
  &__highlighted {
    background-color: ${designTokens.colors.geyser};
  }

  &__button {
    width: 100%;
    display: flex;
    text-align: left;
    padding: 0;
    border-style: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    :lang(en) & {
      font-family: ${designTokens.fonts.family.en};
    }
    font-size: ${designTokens.fonts.size[5]};
    line-height: 1.5;
  }

  &__name {
    flex: 1;
    font-size: ${designTokens.fonts.size[4]};
    margin: 0 12px;
    color: ${designTokens.colors.curiousBlue};
    overflow-wrap: anywhere;
  }

  // KLOG-5698対応
  // TODO: 省略表示の提供を終了するときは、__ellipsis以下のCSSをまるごと削除する
  &__ellipsis {
    padding: 0;
  }

  &__ellipsis &__button {
    align-items: center;
  }

  &__ellipsis &__name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

type OuterProps = {
  searchResultContent: SearchResultContent;
  highlighted: boolean;
  onClick: React.MouseEventHandler<HTMLLIElement>;
};

const Container: React.VFC<OuterProps> = ({
  searchResultContent,
  ...props
}) => {
  const { getDisplayName, wrapEntityLabel } =
    React.useContext(EntitySelectContext);
  const name = getDisplayName(searchResultContent);

  return (
    <StyledComponent
      {...props}
      searchResultContent={searchResultContent}
      name={name}
      wrapEntityLabel={wrapEntityLabel}
    />
  );
};

export const SearchResultItem = Container;
