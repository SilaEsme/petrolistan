import { colors } from './tokens/colors';
import { typography } from './tokens/typography';

// Renk anahtarlarını tip olarak çıkartıyoruz (örn: 'primary' | 'secondary')
export type ColorVariant = keyof typeof colors;
export type TextVariant = keyof typeof typography.fontSize;