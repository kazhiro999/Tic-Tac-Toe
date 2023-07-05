import { colors } from '../designTokens/colors';
import { fonts } from '../designTokens/fonts';

export const kintoneBody = {
  margin: 0,
  padding: 0,
  height: '100%',
  minWidth: '980px',
  backgroundColor: colors.snow,
  color: colors.mineShaft,
  wordWrap: 'break-word',
  fontSize: fonts.size[5],
  lineHeight: '1.5'
} as const;
