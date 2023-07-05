import React from 'react';
import styled from 'styled-components';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${id}-1)`}>
        <rect width="54" height="54" fill="white" />
        <path
          d="M46 -1H47V0V46C47 49.866 43.866 53 40 53H2H1V52V0V-1H2H46Z"
          fill="#11A5A0"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x="40.5"
          y="22.5"
          width="1"
          height="31"
          rx="0.5"
          transform="rotate(90 40.5 22.5)"
          stroke="white"
        />
        <rect
          x="25.5"
          y="28.5"
          width="1"
          height="16"
          rx="0.5"
          transform="rotate(90 25.5 28.5)"
          stroke="white"
        />
        <rect
          x="38.5"
          y="10.5"
          width="1"
          height="13"
          rx="0.5"
          transform="rotate(90 38.5 10.5)"
          stroke="white"
        />
        <rect
          x="27.5"
          y="34.5"
          width="1"
          height="18"
          rx="0.5"
          transform="rotate(90 27.5 34.5)"
          stroke="white"
        />
        <rect
          x="40.5"
          y="16.5"
          width="1"
          height="15"
          rx="0.5"
          transform="rotate(90 40.5 16.5)"
          stroke="white"
        />
        <rect
          x="11"
          y="9"
          width="8"
          height="8"
          rx="1"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />
        <rect
          x="32"
          y="29"
          width="8"
          height="8"
          rx="1"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 48V52H6C3.79086 52 2 50.2091 2 48Z"
          fill="white"
        />
        <mask
          id={`${id}-2`}
          maskUnits="userSpaceOnUse"
          x="6"
          y="45"
          width="48"
          height="11"
          fill="black"
        >
          <rect fill="white" x="6" y="45" width="48" height="11" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 54V53.9C10.2822 53.4367 12 51.419 12 49V47H44H48H52V50C52 52.2091 50.2091 54 48 54H8Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 54V53.9C10.2822 53.4367 12 51.419 12 49V47H44H48H52V50C52 52.2091 50.2091 54 48 54H8Z"
          fill="#11A5A0"
        />
        <path
          d="M8 53.9L7.60214 51.94L6 52.2652V53.9H8ZM8 54H6V56H8V54ZM12 47V45H10V47H12ZM52 47H54V45H52V47ZM6 53.9V54H10V53.9H6ZM10 49C10 50.449 8.97064 51.6622 7.60214 51.94L8.39786 55.86C11.5938 55.2113 14 52.3889 14 49H10ZM10 47V49H14V47H10ZM44 45H12V49H44V45ZM44 49H48V45H44V49ZM48 49H52V45H48V49ZM50 47V50H54V47H50ZM50 50C50 51.1046 49.1046 52 48 52V56C51.3137 56 54 53.3137 54 50H50ZM8 56H48V52H8V56Z"
          fill="white"
          mask={`url(#${id}-2)`}
        />
      </g>
      <defs>
        <clipPath id={`${id}-1`}>
          <rect width="54" height="54" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GuideBlogIcon = styled(Component)``;
