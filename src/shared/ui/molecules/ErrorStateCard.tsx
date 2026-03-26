import { FeedbackCard } from './FeedbackCard';

type ErrorStateCardProps = {
  isRetrying?: boolean;
  message: string;
  onRetry: () => void;
  retryLabel?: string;
  title: string;
};

export const ErrorStateCard = ({
  isRetrying = false,
  message,
  onRetry,
  retryLabel = 'Reintentar',
  title,
}: ErrorStateCardProps) => (
  <FeedbackCard
    actionLabel={isRetrying ? 'Reintentando...' : retryLabel}
    actionLoading={isRetrying}
    message={message}
    onAction={onRetry}
    title={title}
  />
);
