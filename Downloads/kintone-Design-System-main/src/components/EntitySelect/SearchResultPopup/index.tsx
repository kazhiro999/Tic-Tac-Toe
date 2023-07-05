import * as React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { SearchResultContent } from '../modules/types';
import { SearchResultItem } from './SearchResultItem';
import { useOutsideTargetElementOnClick } from '../../../hooks/useOutsideTargetElementOnClick';
import { buildEntitySelectOperations } from '../modules/operations';
import { EntitySelectContext } from '../EntitySelectContext';
import { getEntityTypeId } from '../../../functions/entity';
import { designTokens } from '../../../designTokens';
import { PropsForStyled } from '../../../typings/propsForStyled';

type Props = {
  searchResultContents: SearchResultContent[] | null;
  highlightSearchResultContentItemId: string | null;
  selectSearchResultContent: (searchResultContent: SearchResultContent) => void;
  hidePopup: () => void;
  wrapEntityLabel: boolean;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  searchResultContents,
  highlightSearchResultContentItemId,
  selectSearchResultContent,
  hidePopup,
  wrapEntityLabel
}) => {
  const targetRef = useOutsideTargetElementOnClick<HTMLUListElement>(hidePopup);

  if (searchResultContents === null) {
    return null;
  }

  return (
    <ul
      className={clsx(className, {
        // KLOG-5698対応
        // TODO: 省略表示の提供を終了するときは、次の行を削除する
        [`${className}__ellipsis`]: !wrapEntityLabel
      })}
      ref={targetRef}
      role="listbox"
    >
      {searchResultContents.map((content) => {
        return (
          <SearchResultItem
            key={getEntityTypeId(content)}
            searchResultContent={content}
            highlighted={highlightSearchResultContentItemId === content.itemId}
            onClick={() => selectSearchResultContent(content)}
          />
        );
      })}
    </ul>
  );
};

export const StyledComponent: React.VFC<Props> = styled(Component)`
  width: max-content;
  min-width: 280px;
  max-width: 480px;
  max-height: 560px;
  overflow-y: auto;
  background-color: ${designTokens.colors.aquaHaze};
  border: 1px solid ${designTokens.colors.porcelain};
  box-sizing: border-box;
  box-shadow: 0 5px 10px ${designTokens.colors.porcelain};
  z-index: ${designTokens.zIndex.popup};
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0;
  padding: 0;
  list-style: none;

  // KLOG-5698対応
  // TODO: 省略表示の提供を終了するときは、__ellipsis以下のCSSを削除する
  &__ellipsis {
    width: 280px;
    min-width: unset;
    max-width: unset;
    background-color: unset;
  }
`;

const Container: React.VFC = () => {
  const {
    state,
    dispatch,
    values,
    changeValues,
    repositories,
    locales,
    wrapEntityLabel
  } = React.useContext(EntitySelectContext);
  const { searchResultContents, highlightSearchResultContentItemId } = state;
  const entitySelectOperations = buildEntitySelectOperations(repositories, {
    creatorNameLabel: locales.creatorNameLabel
  });

  const selectSearchResultContent = (
    searchResultContent: SearchResultContent
  ) => {
    entitySelectOperations.selectSearchResultContent(
      dispatch,
      searchResultContent,
      values,
      changeValues
    );
  };

  const hidePopup = () => {
    entitySelectOperations.hideSearchResultPopup(dispatch);
  };

  return (
    <StyledComponent
      searchResultContents={searchResultContents}
      highlightSearchResultContentItemId={highlightSearchResultContentItemId}
      selectSearchResultContent={selectSearchResultContent}
      hidePopup={hidePopup}
      wrapEntityLabel={wrapEntityLabel}
    />
  );
};

export const SearchResultPopup = Container;
