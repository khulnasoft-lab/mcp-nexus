import styled from 'styled-components';
import { theme } from '@/styles/theme';

interface CardProps {
  hoverable?: boolean;
  interactive?: boolean;
}

export const Card = styled.div<CardProps>`
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  transition: all ${theme.transitions.fast};

  ${({ hoverable }) =>
    hoverable &&
    `
    &:hover {
      box-shadow: ${theme.shadows.md};
      transform: translateY(-2px);
    }
  `}

  ${({ interactive }) =>
    interactive &&
    `
    cursor: pointer;
    &:active {
      transform: scale(0.98);
    }
  `}
`;

export const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${theme.colors.gray[900]};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
`;

export const CardDescription = styled.p`
  margin: 0.5rem 0 0;
  color: ${theme.colors.gray[500]};
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  background-color: ${theme.colors.gray[50]};
  border-top: 1px solid ${theme.colors.gray[200]};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
