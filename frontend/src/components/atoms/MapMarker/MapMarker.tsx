import React from 'react';
import { theme } from '../../../theme';

export interface MapMarkerProps {
  size?: 'small' | 'medium' | 'large';
  color?: keyof typeof theme.colors;
  className?: string;
  onClick?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  size = 'medium',
  color = 'warning',
  className = '',
  onClick,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: '8px',
          height: '8px',
        };
      case 'medium':
        return {
          width: '12px',
          height: '12px',
        };
      case 'large':
        return {
          width: '16px',
          height: '16px',
        };
      default:
        return {
          width: '12px',
          height: '12px',
        };
    }
  };

  const getColorStyles = () => {
    return { backgroundColor: theme.colors[color] };
  };

  const baseStyles = {
    borderRadius: '50%',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
  };

  const styles = {
    ...baseStyles,
    ...getSizeStyles(),
    ...getColorStyles(),
  };

  return <div style={styles} className={className} onClick={onClick} />;
};

export default MapMarker;
