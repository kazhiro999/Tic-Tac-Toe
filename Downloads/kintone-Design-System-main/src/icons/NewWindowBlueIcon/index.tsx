import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../../designTokens/index';
import { useComponentId } from '../../hooks/useComponentId';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => {
  const id = useComponentId();
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask className={`${className}__white`} id={`${id}-1`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.5 10.5V4.375H0.875V13.125H9.625V10.5H3.5ZM0 3.5V14H10.5V10.5H3.5V3.5H0Z"
        />
      </mask>
      <path
        className={`${className}__white`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 10.5V4.375H0.875V13.125H9.625V10.5H3.5ZM0 3.5V14H10.5V10.5H3.5V3.5H0Z"
      />
      <path
        className={`${className}__blue`}
        d="M0.875 4.375V3.375H-0.125V4.375H0.875ZM3.5 10.5H2.5V11.5H3.5V10.5ZM0.875 13.125H-0.125V14.125H0.875V13.125ZM9.625 13.125V14.125H10.625V13.125H9.625ZM0 3.5V2.5H-1V3.5H0ZM0 14H-1V15H0V14ZM10.5 14V15H11.5V14H10.5ZM3.5 3.5H4.5V2.5H3.5V3.5ZM10.5 10.5H11.5V9.5H10.5V10.5ZM3.5 4.375H4.5V3.375H3.5V4.375ZM9.625 10.5H10.625V9.5H9.625V10.5ZM1.875 13.125V4.375H-0.125V13.125H1.875ZM9.625 12.125H0.875V14.125H9.625V12.125ZM0 4.5H3.5V2.5H0V4.5ZM1 14V3.5H-1V14H1ZM10.5 13H0V15H10.5V13ZM9.5 10.5V14H11.5V10.5H9.5ZM2.5 3.5V10.5H4.5V3.5H2.5ZM3.5 11.5H10.5V9.5H3.5V11.5ZM0.875 5.375H3.5V3.375H0.875V5.375ZM2.5 4.375V10.5H4.5V4.375H2.5ZM3.5 11.5H9.625V9.5H3.5V11.5ZM8.625 10.5V13.125H10.625V10.5H8.625Z"
        mask={`url(#${id}-1)`}
      />
      <mask className={`${className}__white`} id={`${id}-2`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.125 0.875H4.375V9.625H13.125V0.875ZM3.5 0V10.5H14V0H3.5Z"
        />
      </mask>
      <path
        className={`${className}__white`}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.125 0.875H4.375V9.625H13.125V0.875ZM3.5 0V10.5H14V0H3.5Z"
      />
      <path
        className={`${className}__blue`}
        d="M4.375 0.875V-0.125H3.375V0.875H4.375ZM13.125 0.875H14.125V-0.125H13.125V0.875ZM4.375 9.625H3.375V10.625H4.375V9.625ZM13.125 9.625V10.625H14.125V9.625H13.125ZM3.5 0V-1H2.5V0H3.5ZM3.5 10.5H2.5V11.5H3.5V10.5ZM14 10.5V11.5H15V10.5H14ZM14 0H15V-1H14V0ZM4.375 1.875H13.125V-0.125H4.375V1.875ZM5.375 9.625V0.875H3.375V9.625H5.375ZM13.125 8.625H4.375V10.625H13.125V8.625ZM12.125 0.875V9.625H14.125V0.875H12.125ZM3.5 1H14V-1H3.5V1ZM4.5 10.5V0H2.5V10.5H4.5ZM14 9.5H3.5V11.5H14V9.5ZM13 0V10.5H15V0H13Z"
        mask={`url(#${id}-2)`}
      />
      <rect
        className={`${className}__blue`}
        x="4.375"
        y="0.875"
        width="8.75"
        height="2.625"
      />
      <rect
        className={`${className}__blue`}
        x="0.875"
        y="4.375"
        width="2.625"
        height="2.625"
      />
    </svg>
  );
};

export const NewWindowBlueIcon = styled(Component)`
  fill: none;

  &__white {
    fill: ${designTokens.colors.snow};
  }

  &__blue {
    fill: ${designTokens.colors.deprecatedIconBlue};
  }
`;
