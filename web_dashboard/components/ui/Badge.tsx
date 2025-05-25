import styled, { css } from 'styled-components';
import { theme } from '@/styles/theme';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const variantStyles = {
  default: css`
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
  `,
  success: css`
    background-color: ${theme.colors.success.light}20;
    color: ${theme.colors.success.dark};
  `,
  error: css`
    background-color: ${theme.colors.error.light}20;
    color: ${theme.colors.error.dark};
  `,
  warning: css`
    background-color: ${theme.colors.warning.light}20;
    color: ${theme.colors.warning.dark};
  `,
};

const sizeStyles = {
  sm: css`
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
  `,
  md: css`
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  `,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 500;
  line-height: 1.25;
  border-radius: 9999px;
  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'default' }) => variantStyles[variant]}
`;
