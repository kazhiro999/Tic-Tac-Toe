import React from 'react';
import { ImgIcon } from './ImgIcon';
import { SvgIcon } from './SvgIcon';

export type IconProps = {
  alternativeText: string;
  width: number;
  height: number;
  icon?: React.ReactNode;
  iconUrl?: string;
  rotate?: number;
};

const Component: React.VFC<IconProps> = ({ icon, iconUrl, ...props }) =>
  // iconNameが指定されているかどうかで描画方法を切り替えます。
  // iconNameが指定されていれば、Svg要素を用いたアイコンを描画します。
  // iconNameが指定されていなければ、iconUrlを用いて、従来のimg要素を用いたアイコンを描画します。
  //
  // img要素を用いたアイコンを描画するロジックを残すのは、影響範囲が大きいためです。
  // iconUrlプロパティを削除すると、kintone-ui内の様々なコンポーネントでiconUrlを使っている箇所を修正する必要があります。
  // このためimg要素を用いたアイコンを描画するロジックを残し、影響範囲がIconコンポーネントに閉じるようにしています。
  //
  icon ? (
    <SvgIcon icon={icon} {...props} />
  ) : (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    <ImgIcon iconUrl={iconUrl!} {...props} />
  );

export const Icon = Component;
