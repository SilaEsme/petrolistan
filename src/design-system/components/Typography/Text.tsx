import React from 'react';
import { typography } from '../../tokens/typography';
import { colors } from '../../tokens/colors';

interface TextProps {
  variant?: keyof typeof typography.fontSize;
  color?: string;
  weight?: keyof typeof typography.fontWeight;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' | 'label'; // label da gerekebilir
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // <-- EKLENEN KISIM: Artık style kabul ediyor
}

export const Text: React.FC<TextProps> = ({
  variant = 'md',
  color = colors.secondary.main,
  weight = 'regular',
  as: Component = 'p',
  children,
  className = '',
  style // <-- Prop olarak alıyoruz
}) => {
  
  // Varsayılan stiller
  const baseStyles: React.CSSProperties = {
    fontFamily: variant === 'h1' ? typography.fontFamily.secondary : typography.fontFamily.primary,
    fontSize: typography.fontSize[variant],
    fontWeight: typography.fontWeight[weight],
    color: color,
    lineHeight: 1.5,
    margin: 0,
  };

  return (
    // baseStyles ile dışarıdan gelen style'ı birleştiriyoruz
    // Dışarıdan gelen (style) her zaman baseStyles'ı ezmeli, o yüzden sonda.
    <Component style={{ ...baseStyles, ...style }} className={className}>
      {children}
    </Component>
  );
};