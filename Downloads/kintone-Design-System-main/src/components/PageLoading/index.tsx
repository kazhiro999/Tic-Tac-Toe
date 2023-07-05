import * as React from 'react';
import styled from 'styled-components';
import { Overlay } from './Overlay';
import { Spinner } from '../Spinner';
import { useComponentId } from '../../hooks/useComponentId';
import { useInertForBodyChildren } from './useInertForBodyChildren';
import { createPortal } from 'react-dom';
import { getDocumentBody } from '../../functions/document';
import { PropsForStyled } from '../../typings/propsForStyled';
import { designTokens } from '../../designTokens';

export type PageLoadingProps = {
  shown: boolean;
  dataTestId?: string;
  dataTestIdOverlay?: string;
};

const Component: React.VFC<PageLoadingProps & PropsForStyled> = ({
  className,
  shown,
  dataTestId,
  dataTestIdOverlay
}) => {
  const loadingId = useComponentId();
  const ref = useInertForBodyChildren<HTMLDivElement>(shown, loadingId);
  return createPortal(
    <div
      data-testid={dataTestId}
      ref={ref}
      className={className}
      role="status"
      aria-live="polite"
    >
      {shown && (
        <Overlay data-testid={dataTestIdOverlay}>
          <div className={`${className}__content`}>
            <Spinner />
            <div className={`${className}__label`}>Now loading...</div>
          </div>
        </Overlay>
      )}
    </div>,
    getDocumentBody()
  );
};

const StyledComponent: React.VFC<PageLoadingProps> = styled(Component)`
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__label {
    padding-top: 10px;
    margin: 0;
    color: ${designTokens.colors.mineShaft};
    font-size: ${designTokens.fonts.size[4]};
  }
`;

export const PageLoading = StyledComponent;
