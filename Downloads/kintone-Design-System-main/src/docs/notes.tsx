import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import RemarkBreaks from 'remark-breaks';
import RemarkGfm from 'remark-gfm';
import { designTokens } from '../designTokens';
import { useComponentId } from '../hooks/useComponentId';
import { TypeOfValues } from '../typings/utilities';
import { PropsForStyled } from '../typings/propsForStyled';

export const VARIANTS = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  DANGER: 'DANGER'
} as const;

type Variant = TypeOfValues<typeof VARIANTS>;

type Props = {
  children: string;
  subtitle?: string;
  /**
   * INFOは補足情報、WARNINGは注意、DANGERは警告・厳重注意に使用してください
   */
  variant?: Variant;
};

const Component: React.VFC<Props & PropsForStyled> = ({
  className,
  children,
  subtitle,
  variant = VARIANTS.INFO
}) => {
  let title;
  if (variant === VARIANTS.WARNING) {
    title = '注意';
  } else if (variant === VARIANTS.DANGER) {
    title = '警告';
  } else {
    title = '補足';
  }

  const titleId = useComponentId();

  return (
    <aside
      className={`${className} ${className}__${variant}`}
      aria-labelledby={titleId}
    >
      <div
        className={`${className}__title ${className}__${variant}__title`}
        id={titleId}
      >
        {title}
      </div>
      <div className={`${className}__contents`}>
        <span className={`${className}__subtitle`}> {subtitle} </span>
        <ReactMarkdown
          className={`${className}__md`}
          skipHtml={false}
          remarkPlugins={[RemarkBreaks, RemarkGfm]}
        >
          {children}
        </ReactMarkdown>
      </div>
    </aside>
  );
};

const StyledComponent: React.VFC = styled(Component)`
  padding: 8px 16px;
  margin: 16px 2px;
  border-radius: 4px;
  display: flex;
  font-size: ${designTokens.fonts.size[4]};

  &__title {
    margin-right: 1em;
    font-weight: bold;
    flex-shrink: 0;
  }

  &__subtitle {
    font-weight: bold;
  }

  &__INFO {
    background-color: #deebff;
    & &__title {
      color: #084c7a;
    }
  }

  &__WARNING {
    background-color: #fefef5;
    & &__title {
      color: #c27708;
    }
  }

  &__DANGER {
    background-color: #fff5f5;
    & &__title {
      color: #dd4020;
    }
  }

  &__md p {
    margin: 0;
  }
`;

export const Notes = StyledComponent;
