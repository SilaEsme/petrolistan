import React from 'react';
import { Text } from '../Typography/Text';
import { colors } from '../../tokens/colors';

interface AdSpaceProps {
  position: 'left' | 'right';
  className?: string; // CSS ile mobilde gizlemek için
}

export const AdSpace: React.FC<AdSpaceProps> = ({ position, className }) => {
  return (
    <div 
      className={className}
      style={{
        width: '160px', // Standart 'Skyscraper' genişliği
        minWidth: '160px',
        height: '600px',
        backgroundColor: '#e0e0e0', // Reklam yoksa gri alan
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'sticky', // Ekrana yapışması için
        top: '100px', // Navbar'ın altından başlasın
        border: `1px dashed ${colors.secondary.light}`,
        margin: position === 'left' ? '0 20px 0 0' : '0 0 0 20px'
      }}
    >
      <Text variant="sm" color={colors.secondary.light} weight="bold">
        REKLAM ALANI
      </Text>
      <Text variant="xs" color="#999">
        160x600
      </Text>
    </div>
  );
};