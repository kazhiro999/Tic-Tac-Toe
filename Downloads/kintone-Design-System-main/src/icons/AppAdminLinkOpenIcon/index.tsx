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
    <rect x="-298.5" y="-5.5" width="320" height="27" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6459 8.01054V10.6598C11.6459 12.4061 11.4034 12.4259 10.0415 12.4259H5.91588C4.18449 12.4259 3.85306 12.2484 3.85306 10.6598V6.46515C3.85306 4.98732 3.82464 4.91976 5.68668 4.91976H8.89551L9.81231 4.03668H5.22827C3.74304 4.03668 2.93946 4.81335 2.93946 6.24438V10.8898C2.91211 11.5418 3.17195 12.1746 3.65491 12.6321C4.13788 13.0896 4.78115 13.3462 5.45747 13.309H10.4999C11.9856 13.309 12.5627 12.3116 12.5627 10.8805V7.12746L11.6459 8.01054ZM12.0928 3.35408H8.44166V2.3125H14.1704V7.5204H13.1288V4.04855L7.61789 9.92701L6.71998 9.08525L12.0928 3.35408Z"
    />
  </svg>
);

export const AppAdminLinkOpenIcon = styled(Component)`
  fill: none;

  & rect {
    stroke: ${designTokens.colors.alto};
  }

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
