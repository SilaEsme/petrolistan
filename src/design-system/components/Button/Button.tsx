import React from 'react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';

// Buton varyasyonlarını tanımlıyoruz
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  style,
  ...props 
}) => {
  
  // Varyasyona göre renkleri belirle
  const getThemeStyles = (): React.CSSProperties => {
    const base = {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: typography.fontSize.md,
      fontWeight: typography.fontWeight.medium,
      transition: 'all 0.2s ease',
      width: fullWidth ? '100%' : 'auto',
    };

    switch (variant) {
      case 'primary':
        return {
          ...base,
          backgroundColor: colors.primary.main,
          color: colors.primary.contrastText,
        };
      case 'secondary':
        return {
          ...base,
          backgroundColor: colors.secondary.main,
          color: colors.secondary.contrastText,
        };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          border: `2px solid ${colors.primary.main}`,
          color: colors.primary.dark,
        };
      default:
        return base;
    }
  };

  return (
    <button style={{ ...getThemeStyles(), ...style }} {...props}>
      {children}
    </button>
  );
};