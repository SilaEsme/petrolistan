import React from 'react';
import { colors } from '../../tokens/colors';

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  return (
    <div style={{
      backgroundColor: colors.background.paper,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: `1px solid ${colors.secondary.light}20`, // %20 opacity
      ...style
    }}>
      {children}
    </div>
  );
};