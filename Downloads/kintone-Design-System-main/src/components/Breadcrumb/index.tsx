import * as React from 'react';
import styled from 'styled-components';
import { BreadcrumbStructure } from './modules/types';
import { Link } from '../Link';
import { designTokens } from '../../designTokens';
import { Icon } from '../Icon';
import { AppBreadcrumbArrowIcon } from '../../icons';
import { PropsForStyled } from '../../typings/propsForStyled';

type Props = {
  breadcrumbStructure: BreadcrumbStructure;
  portalLabel: string;
};

export type BreadcrumbProps = Props;

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  breadcrumbStructure,
  portalLabel
}) => {
  const Separator = () => (
    <span className={`${className}__separator`}>
      <Icon
        icon={<AppBreadcrumbArrowIcon />}
        alternativeText=""
        width={8}
        height={8}
      />
    </span>
  );

  return (
    <nav className={className} data-testid="shared-Breadcrumb">
      <ol className={`${className}__list`}>
        <li
          className={`${className}__item`}
          data-testid="shared-Breadcrumb-item"
        >
          <Link url={breadcrumbStructure.portalUrl}>{portalLabel}</Link>
          <Separator />
        </li>
        {breadcrumbStructure.items.map((breadcrumbItem, index) => (
          <li
            className={`${className}__item`}
            key={index}
            data-testid="shared-Breadcrumb-item"
          >
            {breadcrumbItem.title && (
              <span className={`${className}__title`}>
                {breadcrumbItem.title}:{' '}
              </span>
            )}
            {breadcrumbItem.current && (
              <span aria-current="page">{breadcrumbItem.label}</span>
            )}
            {!breadcrumbItem.current && breadcrumbItem.href && (
              <Link
                className={`${className}__link`}
                url={breadcrumbItem.href}
                title={breadcrumbItem.label}
              >
                {breadcrumbItem.label}
              </Link>
            )}
            {!breadcrumbItem.current && !breadcrumbItem.href && (
              <span className={`${className}__text`}>
                {breadcrumbItem.label}
              </span>
            )}
            {!breadcrumbItem.current && <Separator />}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const StyledComponent: React.VFC<Props> = styled(Component)`
  background-color: ${designTokens.colors.snow};
  color: ${designTokens.colors.gray};
  &:lang(en) {
    font-family: ${designTokens.fonts.family.en};
  }
  &:lang(ja) {
    font-family: ${designTokens.fonts.family.ja};
  }
  &:lang(zh) {
    font-family: ${designTokens.fonts.family.zh};
  }
  &:lang(zh-TW) {
    font-family: ${designTokens.fonts.family.zhTW};
  }
  font-size: ${designTokens.fonts.size[3]};
  line-height: 1.5;
  height: 36px;
  display: flex;
  align-items: center;

  &__title {
    margin-right: 3px;
  }

  &__link {
    display: block;
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    align-items: center;
  }

  &__separator {
    padding: 0 8px;
  }
`;

export const Breadcrumb = StyledComponent;
