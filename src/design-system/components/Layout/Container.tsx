import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  maxWidth = '1200px',
  style 
}) => {
  return (
    <div style={{
      maxWidth: maxWidth,
      margin: '0 auto',
      padding: '0 20px', // Mobilde kenarlara yapışmaması için
      ...style
    }}>
      {children}
    </div>
  );
};