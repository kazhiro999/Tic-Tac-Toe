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
    <rect width="56" height="56" fill="#D8D8D8" fillOpacity="0.01" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M39.6212 46.5024C39.4288 45.9395 38.0819 45.3498 37.5321 45.0817C35.9653 44.2239 34.3709 43.3929 32.8316 42.5083C32.1169 42.0794 31.2373 41.2752 30.3851 41.2752C28.7083 41.2752 26.2619 46.1271 24.7775 46.1271C24.0353 46.1271 23.0732 45.457 22.4135 45.0817C17.4106 42.3743 13.947 38.9967 11.1707 34.1179C10.7859 33.4746 10.0987 32.5364 10.0987 31.8126C10.0987 30.365 15.0741 27.9793 15.0741 26.3441C15.0741 25.5131 14.2494 24.6553 13.8096 23.9583C12.9025 22.4572 12.0503 20.9024 11.1707 19.3745C10.8958 18.8383 10.2911 17.5248 9.71383 17.3372C9.52141 17.2568 9.32899 17.2568 9.13657 17.2568C8.14699 17.2568 6.2228 17.6857 5.31568 18.0878C3.96875 18.6507 3.08912 20.1519 2.40191 21.3581C1.52228 22.9397 1 24.5481 1 26.3441C1 28.8371 2.04456 31.0888 2.8967 33.3673C3.50145 35.0025 4.24363 36.5841 5.17824 38.0584C8.06453 42.6155 13.6997 48.1108 18.3727 50.9255C19.8845 51.8369 21.5064 52.5606 23.1832 53.1504C25.5197 53.9814 27.8287 55 30.3851 55C32.2269 55 33.8762 54.4907 35.498 53.6329C36.735 52.9627 38.2743 52.1049 38.8516 50.7914C39.2639 49.9068 39.7037 48.0304 39.7037 47.0654C39.7037 46.8777 39.7037 46.6901 39.6212 46.5024Z"
      fill="#9BCC60"
    />
    <rect x="20" y="1" width="35" height="25" fill="#9BCC60" />
    <path
      d="M20 1.59984L36.9004 18.5003L54.4007 1"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);

export const GuideInquiryIcon = styled(Component)``;
