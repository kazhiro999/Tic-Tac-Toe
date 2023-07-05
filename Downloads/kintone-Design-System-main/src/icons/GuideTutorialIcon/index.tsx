import React from 'react';
import styled from 'styled-components';
import { PropsForStyled } from '../../typings/propsForStyled';

const Component: React.VFC<PropsForStyled> = ({ className }) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.15272 38.2513C6.15272 38.2513 6.15272 19.7377 6.15272 5.58468C6.15272 0.458993 6.993 -0.918056 8.82633 0.918009C10.6597 2.75407 27.1215 17.2513 27.1215 17.2513L27.1597 54.6229C27.1597 54.6229 27.1215 56.918 25.4895 55.4652C16.6562 47.7377 6.15272 38.2513 6.15272 38.2513Z"
      fill="#F1C40F"
    />
    <path
      d="M50 38.1082C50 38.1082 50 19.5945 50 5.44149C50 0.315805 49.1597 -1.06124 47.3264 0.774821C45.493 2.61089 29.0312 17.1082 29.0312 17.1082L28.993 54.4797C28.993 54.4797 29.0312 56.7748 30.6632 55.322C39.4965 47.5945 50 38.1082 50 38.1082Z"
      fill="#7CA34D"
    />
  </svg>
);

export const GuideTutorialIcon = styled(Component)``;
