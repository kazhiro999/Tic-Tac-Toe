import React from 'react';
import styled from 'styled-components';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id={id}
        maskUnits="userSpaceOnUse"
        x="20"
        y="0"
        width="7"
        height="22"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.2802 0.584961L20.2671 0.584961L20.2671 21.3456H26.2802V0.584961V0.584961Z"
          fill="white"
        />
      </mask>
      <g mask={`url(#${id})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.6562 0.584656C15.554 6.33856 23.7345 13.5297 21.8862 21.3456C30.7114 16.6152 23.2779 10.0471 24.6562 0.584656Z"
          fill="#C99D0E"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.2846 26.0156C43.7557 25.0353 45.8944 24.6764 47.6621 24.801C49.4248 24.9223 50.85 25.5072 51.911 26.441C53.0089 27.408 53.6787 28.7106 53.8935 30.2293C54.0799 31.5386 53.917 33.0024 53.3916 34.5227C52.2484 37.8042 49.8864 40.3215 47.0896 42.0694C43.8564 44.0832 39.997 45.0685 36.8141 44.9804L36.9081 41.1655C39.4027 41.2336 42.4513 40.4494 45.0332 38.8377C47.1366 37.5234 48.901 35.6658 49.7303 33.2832C50.0627 32.3311 50.1718 31.4704 50.0694 30.7527C49.9854 30.1479 49.7387 29.6477 49.3425 29.2988C48.9094 28.9183 48.2614 28.6757 47.4036 28.6143C46.1798 28.5295 44.6135 28.812 42.7182 29.5613L41.2846 26.0156Z"
        fill="#C99D0E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2725 55.542C15.0165 55.542 10.1801 52.4432 6.70509 45.3086C3.55746 38.8386 3.05888 28.5387 3.00012 22.5621H43.5416C43.4845 28.5387 42.9859 38.8386 39.8383 45.3086C36.365 52.4432 31.5269 55.542 23.2725 55.542Z"
        fill="#C99D0E"
      />
    </svg>
  );
};

export const GuideCafeIcon = styled(Component)``;
