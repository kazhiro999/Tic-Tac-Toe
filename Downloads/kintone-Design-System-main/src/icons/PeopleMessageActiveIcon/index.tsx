import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      className={className}
      width="26"
      height="18"
      viewBox="0 0 26 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath={`url(#${id})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.157 14.0795C23.2454 12.9669 21.2776 11.9501 19.2611 11.033V7.942C19.5456 7.73241 19.7719 7.45603 19.919 7.13827C20.0662 6.8205 20.1295 6.47155 20.1033 6.1235V3.682C20.1033 1.657 18.84 0 16.3129 0C13.7858 0 12.5225 1.657 12.5225 3.682V6.124C12.4953 6.47328 12.5583 6.82364 12.7056 7.14277C12.8529 7.4619 13.0797 7.73951 13.3652 7.95V11.032C11.6533 11.746 8.01225 13.779 7.46931 14.0785C6.79433 14.45 6.6266 14.8055 6.6266 15.667V17.591C6.62741 17.6999 6.67217 17.8041 6.75108 17.8807C6.82999 17.9574 6.93664 18.0003 7.0477 18H25.5781C25.6891 18.0003 25.7958 17.9574 25.8747 17.8807C25.9536 17.8041 25.9983 17.6999 25.9992 17.591V15.667C25.9992 14.8055 25.8314 14.45 25.157 14.0795ZM9.36323 9.827C9.40351 9.985 9.32551 10.0525 9.19143 9.977L7.15629 8.827C6.4918 9.0462 5.7952 9.15717 5.09413 9.1555C2.27798 9.1555 -0.00390625 7.4405 -0.00390625 5.3255C-0.00390625 3.2105 2.27951 1.495 5.09413 1.495C7.90876 1.495 10.1922 3.21 10.1922 5.3255C10.178 5.82216 10.0522 6.30964 9.82389 6.75317C9.59558 7.19671 9.27031 7.58539 8.87127 7.8915L9.36323 9.827Z"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <rect width="26" height="18" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PeopleMessageActiveIcon = styled(Component)`
  fill: none;

  & path {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }

  & rect {
    fill: ${designTokens.colors.snow};
  }
`;
