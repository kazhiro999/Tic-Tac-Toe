import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7095 1.60051L12.0359 1.91447L14.1845 3.828L14.5116 4.14134L14.838 3.828C14.838 3.828 15.2764 3.1437 15.4467 2.99454C15.6169 2.84539 15.7994 2.61865 15.7994 2.61865C15.9792 2.44724 15.9798 2.08773 15.7994 1.91447L14.1845 0.382228L14.1458 0.344718C13.9907 0.193561 13.8959 0.101273 13.5187 0.101273L13.0545 0.532623L12.0359 1.28717L11.7095 1.60051ZM10.6948 2.28565L2.59559 10.1498L5.18593 13.0453L13.5771 4.96394L10.6948 2.28565ZM0.119442 15.2428L1.3882 11.0009L4.61531 13.8046C4.61531 13.8046 0.0554419 15.4038 0.119442 15.2428Z"
    />
  </svg>
);

export const AppAdminFlowViewEditIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
