import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect className={`${className}__st0`} width="32" height="32" />
    <path
      className={`${className}__st1`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.3335 5.3335H10.0002V14.0002H21.3335V5.3335ZM20.0002 6.66683H18.0002V8.66683H20.0002V6.66683ZM16.6668 19.3335H26.6668V27.3335H16.6668V19.3335ZM15.3335 19.3335H5.3335V27.3335H15.3335V19.3335ZM24.0002 21.3335H25.3335V22.6668H24.0002V21.3335ZM14.0002 21.3335H12.6668V22.6668H14.0002V21.3335Z"
    />
    <path
      className={`${className}__st2`}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.6668 14H15.3335V16H9.3335V17.3333V19.3333H10.6668V17.3333H20.6668V19.3333H22.0002V17.3333V16H16.6668V14Z"
    />
  </svg>
);

export const UserSelectOrganizationIcon = styled(Component)`
  fill: none;

  &__st0 {
    fill: #4f91c5;
  }

  &__st1 {
    fill: #eff3f4;
  }

  &__st2 {
    fill: #a6b2b3;
  }
`;
