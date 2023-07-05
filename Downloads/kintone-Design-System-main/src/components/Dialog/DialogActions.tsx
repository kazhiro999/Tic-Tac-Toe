import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  labelOkButton: string;
  onClickOkButton: React.MouseEventHandler<HTMLButtonElement>;
  okButtonDisabled?: boolean;
  labelCancelButton: string;
  onClickCancelButton: React.MouseEventHandler<HTMLButtonElement>;
};

export type DialogActionsProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  labelOkButton,
  onClickOkButton,
  okButtonDisabled = false,
  labelCancelButton,
  onClickCancelButton
}) => {
  return (
    <div className={className}>
      <Button
        onClick={(e) => {
          onClickCancelButton(e);
        }}
        data-testid="shared-Dialog-DialogActions-cancel-button"
      >
        {labelCancelButton}
      </Button>
      <Button
        onClick={(e) => {
          onClickOkButton(e);
        }}
        color="primary"
        disabled={okButtonDisabled}
        data-testid="shared-Dialog-DialogActions-ok-button"
      >
        {labelOkButton}
      </Button>
    </div>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: ${designTokens.colors.snow};
`;

export const DialogActions = StyledComponent;
