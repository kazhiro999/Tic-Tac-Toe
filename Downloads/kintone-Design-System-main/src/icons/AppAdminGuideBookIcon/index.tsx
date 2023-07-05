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
    <rect x="-4.5" y="-5.5" width="320" height="27" />
    <path
      className={`${className}__shadow`}
      d="M13.5806 2.91305C13.5806 2.64892 13.3664 2.43479 13.1023 2.43479H3.05883C2.79469 2.43479 2.58057 2.64892 2.58057 2.91305V15.3478C2.58057 15.612 2.79469 15.8261 3.05883 15.8261H13.1023C13.3664 15.8261 13.5806 15.612 13.5806 15.3478V2.91305Z"
    />
    <path
      className={`${className}__book`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.05883 2.91305H13.1023L13.1023 15.3478H3.05883V2.91305ZM13.1023 2.43479C13.3664 2.43479 13.5806 2.64892 13.5806 2.91305V15.3478C13.5806 15.612 13.3664 15.8261 13.1023 15.8261H3.05883C2.79469 15.8261 2.58057 15.612 2.58057 15.3478V2.91305C2.58057 2.64892 2.79469 2.43479 3.05883 2.43479H13.1023Z"
    />
    <path
      className={`${className}__book`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6675 1C11.9316 1 12.1458 1.21413 12.1458 1.47826V14.3913H4.01532C3.52888 14.3913 3.12725 14.7544 3.06669 15.2244C2.77644 15.0601 2.58053 14.7486 2.58053 14.3913V1.95652C2.58053 1.42825 3.00878 1 3.53706 1H11.6675Z"
    />
    <path
      className={`${className}__book`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6675 1.47826V13.913H4.01532C3.64772 13.913 3.31257 14.0512 3.05879 14.2784V1.95652C3.05879 1.69239 3.27292 1.47826 3.53706 1.47826L11.6675 1.47826ZM2.68125 14.819C2.6168 14.6903 2.58053 14.545 2.58053 14.3913V1.95652C2.58053 1.42825 3.00878 1 3.53706 1H11.6675C11.9316 1 12.1458 1.21413 12.1458 1.47826V14.3913H4.01532C3.70236 14.3913 3.42451 14.5416 3.25001 14.774C3.15327 14.9028 3.08829 15.0568 3.06669 15.2244C2.90133 15.1308 2.76659 14.9894 2.68125 14.819Z"
    />
    <path
      className={`${className}__white`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.9718 3.29639H9.75441V4.82972H4.9718V3.29639ZM10.2327 2.91306V5.21306H4.49354V2.91306H10.2327Z"
    />
    <path
      className={`${className}__white`}
      d="M10.2327 6.6H4.49354V7.07826H10.2327V6.6Z"
    />
    <path
      className={`${className}__white`}
      d="M10.2327 8.03479H4.49354V8.51305H10.2327V8.03479Z"
    />
    <path
      className={`${className}__white`}
      d="M4.607 3H10.1147V5.2H4.60693L4.607 3Z"
    />
  </svg>
);

export const AppAdminGuideBookIcon = styled(Component)`
  fill: none;

  rect {
    stroke: ${designTokens.colors.alto};
  }

  &__shadow {
    fill: ${designTokens.colors.solitude};
  }

  &__book {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }

  &__white {
    fill: ${designTokens.colors.snow};
  }
`;
