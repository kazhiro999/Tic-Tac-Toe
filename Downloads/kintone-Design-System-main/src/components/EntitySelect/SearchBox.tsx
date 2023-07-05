import * as React from 'react';
import styled from 'styled-components';
import { IconButton } from '../IconButton';
import { designTokens } from '../../designTokens';
import { InputText } from '../InputText';
import {
  isArrowDownKey,
  isArrowUpKey,
  isEnterKey,
  isEscKey,
  isTabKey
} from '../../functions/key';
import { buildEntitySelectOperations } from './modules/operations';
import { EntitySelectContext } from './EntitySelectContext';
import { SearchIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  searchText: string;
  changeSearchText: (searchText: string) => void;
  placeholder: string;
  searchResultPopupShown: boolean;
  highlightSearchResultContentItemId: string | null;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  onSearchButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  shouldFocus?: boolean;
  alternativeText: string;
} & Pick<React.AriaAttributes, 'aria-labelledby' | 'aria-required'>;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  searchText,
  changeSearchText,
  placeholder,
  searchResultPopupShown,
  highlightSearchResultContentItemId,
  onKeyDown,
  onSearchButtonClick,
  shouldFocus = false,
  'aria-labelledby': ariaLabelledby,
  'aria-required': ariaRequired,
  alternativeText
}) => (
  <div className={className}>
    <div className={`${className}__input`}>
      <InputText
        value={searchText}
        changeValue={changeSearchText}
        onKeyDown={onKeyDown}
        role="combobox"
        shouldFocus={shouldFocus}
        placeholder={placeholder}
        aria-expanded={searchResultPopupShown}
        aria-haspopup="listbox"
        aria-autocomplete="list"
        aria-label={placeholder}
        aria-labelledby={ariaLabelledby}
        aria-activedescendant={
          highlightSearchResultContentItemId !== null
            ? highlightSearchResultContentItemId
            : undefined
        }
        aria-required={ariaRequired}
      />
    </div>
    <IconButton
      className={`${className}__button`}
      alternativeText={alternativeText}
      width={32}
      height={32}
      iconWidth={20}
      iconHeight={20}
      icon={<SearchIcon />}
      onClick={onSearchButtonClick}
    />
  </div>
);

export const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  align-items: center;
  width: 280px;

  &__input {
    flex: 1;
  }

  &__button {
    border: 1px solid ${designTokens.colors.porcelain};
    background-color: ${designTokens.colors.gallery};
  }
`;

const Container: React.VFC = () => {
  const {
    state,
    dispatch,
    values,
    changeValues,
    placeholder,
    userAvailable,
    organizationAvailable,
    groupAvailable,
    shouldFocus: forceFocus,
    repositories,
    'aria-labelledby': ariaLabelledby,
    'aria-required': ariaRequired,
    locales
  } = React.useContext(EntitySelectContext);
  const {
    searchText,
    searchResultContents,
    highlightSearchResultContentItemId
  } = state;
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const searchResultPopupShown = searchResultContents !== null;

  const changeSearchText = async (newSearchText: string) => {
    await entitySelectOperations.changeSearchText(
      dispatch,
      newSearchText,
      userAvailable,
      organizationAvailable,
      groupAvailable
    );
  };

  const selectHighlightedSearchResultContent = () => {
    if (
      searchResultContents === null ||
      highlightSearchResultContentItemId === null
    ) {
      return;
    }

    const highlightedContent = searchResultContents.find(
      (content) => content.itemId === highlightSearchResultContentItemId
    );
    if (highlightedContent) {
      entitySelectOperations.selectSearchResultContent(
        dispatch,
        highlightedContent,
        values,
        changeValues
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isArrowUpKey(event)) {
      // 下矢印キーを押すと、ハイライト位置を下に移動する
      entitySelectOperations.moveHighlightSearchResultContentItem(
        dispatch,
        'UP'
      );
      // スクロールが発生しないようにイベント伝搬を止める
      event.preventDefault();
    }
    if (isArrowDownKey(event)) {
      // 上矢印キーを押すと、ハイライト位置を上に移動する
      entitySelectOperations.moveHighlightSearchResultContentItem(
        dispatch,
        'DOWN'
      );
      // スクロールが発生しないようにイベント伝搬を止める
      event.preventDefault();
    }
    if (isTabKey(event) || isEscKey(event)) {
      // Tabキー / Shift Tabキーを押すと、検索ポップアップを閉じて前後の要素に移動する
      // Escキーを押すと、検索ポップアップを閉じる
      entitySelectOperations.hideSearchResultPopup(dispatch);
    }
    if (isEnterKey(event)) {
      // Enterキーを押すと、ハイライトしている項目を選択して、ポップアップを閉じる
      // どの項目もハイライトしていない場合は、何もしない
      selectHighlightedSearchResultContent();
    }
  };

  const handleClickSearchButton = () => {
    entitySelectOperations.searchAndShowSearchResultPopup(
      dispatch,
      searchText,
      userAvailable,
      organizationAvailable,
      groupAvailable
    );
  };

  return (
    <StyledComponent
      searchText={searchText}
      changeSearchText={changeSearchText}
      placeholder={placeholder}
      searchResultPopupShown={searchResultPopupShown}
      highlightSearchResultContentItemId={highlightSearchResultContentItemId}
      onKeyDown={handleKeyDown}
      onSearchButtonClick={handleClickSearchButton}
      shouldFocus={forceFocus}
      aria-labelledby={ariaLabelledby}
      aria-required={ariaRequired}
      alternativeText={locales.searchBoxButtonTitleLabel}
    />
  );
};

export const SearchBox = Container;
