import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import * as icons from '../';
import { designTokens } from '../../designTokens';
import { PropsForStyled } from '../../typings/propsForStyled';

const getStyle = (Icon: React.VFC<PropsForStyled>): React.CSSProperties => {
  if (!Icon.displayName) return {};

  const whiteIconName = [
    'DropdownWhiteIcon',
    'GroupWhiteIcon',
    'LogoCnIcon',
    'LogoUsIcon'
  ];
  return whiteIconName.includes(Icon.displayName)
    ? {
        background: designTokens.colors.gray,
        color: designTokens.colors.snow,
        padding: 10
      }
    : {
        background: designTokens.colors.snow,
        color: designTokens.colors.mineShaft,
        padding: 10
      };
};

const Component = () => {
  return (
    <ul
      style={{
        display: 'flex',
        listStyleType: 'none',
        flexDirection: 'column',
        gap: 50,
        margin: 0,
        padding: 0
      }}
    >
      {Object.values(icons).map((Icon, index) => (
        <li key={`${index}-list`} style={getStyle(Icon)}>
          <div style={{ maxWidth: 100 }}>
            <Icon key={`${index}-icon`} />
          </div>
          <div>{Icon.displayName}</div>
        </li>
      ))}
    </ul>
  );
};

export default {
  title: 'Components/Icon',
  component: Component
} as ComponentMeta<typeof Component>;

export const IconList: ComponentStoryObj<typeof Component> = {};
