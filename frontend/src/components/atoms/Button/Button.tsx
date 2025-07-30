import React from 'react';
import { theme } from '../../../theme';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? theme.colors.middleGray : theme.colors.main,
          color: theme.colors.white,
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.white,
          color: theme.colors.dark,
          border: `1px solid ${theme.colors.middleGray}`,
        };
      case 'error':
        return {
          backgroundColor: disabled ? theme.colors.middleGray : theme.colors.warning,
          color: theme.colors.white,
          border: 'none',
        };
      case 'success':
        return {
          backgroundColor: disabled ? theme.colors.middleGray : theme.colors.green,
          color: theme.colors.white,
          border: 'none',
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.white,
          color: theme.colors.dark,
          border: `1px solid ${theme.colors.warning}`,
        };
      default:
        return {
          backgroundColor: disabled ? theme.colors.middleGray : theme.colors.main,
          color: theme.colors.white,
          border: 'none',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
          fontSize: theme.typography.fontSize.sm,
        };
      case 'medium':
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.md,
        };
      case 'large':
        return {
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          fontSize: theme.typography.fontSize.lg,
        };
      default:
        return {
          padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
          fontSize: theme.typography.fontSize.md,
        };
    }
  };

  const baseStyles = {
    borderRadius: theme.borderRadius.md,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: theme.typography.fontFamily.primary,
    outline: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
  };

  const styles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getSizeStyles(),
  };

  return (
    <button
      type={type}
      style={styles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
