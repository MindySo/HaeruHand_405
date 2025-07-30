import React from 'react';
import { theme } from '../../../theme';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'error' | 'success' | 'warning' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  style,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.main,
          color: theme.colors.white,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.warning,
          color: theme.colors.white,
        };
      case 'success':
        return {
          backgroundColor: theme.colors.green,
          color: theme.colors.white,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          color: theme.colors.white,
        };
      case 'neutral':
        return {
          backgroundColor: theme.colors.lightGray,
          color: theme.colors.dark,
        };
      default:
        return {
          backgroundColor: theme.colors.main,
          color: theme.colors.white,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          fontSize: theme.typography.fontSize.xs,
          borderRadius: theme.borderRadius.sm,
        };
      case 'medium':
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.sm,
          borderRadius: theme.borderRadius.md,
        };
      case 'large':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.md,
          borderRadius: theme.borderRadius.md,
        };
      default:
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          fontSize: theme.typography.fontSize.sm,
          borderRadius: theme.borderRadius.md,
        };
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily.primary,
    lineHeight: theme.typography.lineHeight.tight,
    whiteSpace: 'nowrap',
  };

  const styles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <span style={styles} className={className}>
      {children}
    </span>
  );
};

export default Badge;
