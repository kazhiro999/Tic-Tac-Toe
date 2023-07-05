import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.043 17H22.418C22.968 17 23.418 17.45 23.418 18C23.418 18.55 22.998 19.161 22.484 19.358C22.484 19.358 18.209 21 12.209 21C6.209 21 1.934 19.358 1.934 19.358C1.42 19.161 1 18.55 1 18C1 17.45 1.45 17 2 17H2.375L4.875 14L6.209 7H6.222C6.628 4.55 8.502 2.607 10.908 2.079C10.9062 2.07443 10.9035 2.07028 10.9009 2.06617C10.8977 2.06127 10.8946 2.05643 10.893 2.051L10.525 0.949C10.352 0.427 10.659 0 11.209 0H13.209C13.759 0 14.066 0.427 13.893 0.949L13.525 2.051C13.5234 2.05643 13.5203 2.06127 13.5171 2.06617C13.5145 2.07028 13.5118 2.07443 13.51 2.079C15.916 2.607 17.79 4.55 18.196 7H18.209L19.543 14L22.043 17ZM12.2094 23.8331C10.9964 23.8331 9.9684 23.0661 9.5654 21.9951C10.4024 22.0581 11.2824 22.0991 12.2094 22.0991C13.1344 22.0991 14.0154 22.0591 14.8514 21.9961C14.4474 23.0661 13.4214 23.8331 12.2094 23.8331Z"
    />
  </svg>
);

export const HeaderNotificationIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.gray};
  }
`;
