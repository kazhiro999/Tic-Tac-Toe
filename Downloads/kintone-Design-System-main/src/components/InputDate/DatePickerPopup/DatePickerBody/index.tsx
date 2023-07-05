import React from 'react';

type Props = {
  children: React.ReactElement;
};

const Component: React.VFC<Props> = ({ children }) => children;

export const DatePickerBody = Component;
