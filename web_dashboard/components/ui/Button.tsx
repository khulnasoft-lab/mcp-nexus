import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  md: css`
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  `,
  lg: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${theme.colors.primary[600]};
    color: white;
    &:hover:not(:disabled) {
      background-color: ${theme.colors.primary[700]};
    }
    &:active:not(:disabled) {
      background-color: ${theme.colors.primary[800]};
    }
  `,
  secondary: css`
    background-color: white;
    color: ${theme.colors.gray[700]};
    border: 1px solid ${theme.colors.gray[300]};
    &:hover:not(:disabled) {
      background-color: ${theme.colors.gray[50]};
      border-color: ${theme.colors.gray[400]};
    }
    &:active:not(:disabled) {
      background-color: ${theme.colors.gray[100]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${theme.colors.gray[700]};
    &:hover:not(:disabled) {
      background-color: ${theme.colors.gray[100]};
    }
    &:active:not(:disabled) {
      background-color: ${theme.colors.gray[200]};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary[600]};
    outline-offset: 2px;
  }
  
  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'primary' }) => variantStyles[variant]}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
`;
