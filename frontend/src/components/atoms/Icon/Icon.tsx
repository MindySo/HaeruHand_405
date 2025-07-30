import React from 'react';
import { theme } from '../../../theme';

export interface IconProps {
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: keyof typeof theme.colors;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  children,
  size = 'medium',
  color = 'dark',
  className = '',
  onClick,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: '16px',
          height: '16px',
        };
      case 'medium':
        return {
          width: '24px',
          height: '24px',
        };
      case 'large':
        return {
          width: '32px',
          height: '32px',
        };
      default:
        return {
          width: '24px',
          height: '24px',
        };
    }
  };

  const getColorStyles = () => {
    return { color: theme.colors[color] };
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
  };

  const styles = {
    ...baseStyles,
    ...getSizeStyles(),
    ...getColorStyles(),
  };

  return (
    <span style={styles} className={className} onClick={onClick}>
      {children}
    </span>
  );
};

export default Icon;
