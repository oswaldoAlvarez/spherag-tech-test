import { FeedbackCard } from '../../../shared/ui/molecules/FeedbackCard';

type AtlasErrorStateProps = {
  isRetrying?: boolean;
  message: string;
  onRetry: () => void;
};

export const AtlasErrorState = ({
  isRetrying = false,
  message,
  onRetry,
}: AtlasErrorStateProps) => (
  <FeedbackCard
    actionLabel={isRetrying ? 'Reintentando...' : 'Reintentar'}
    actionLoading={isRetrying}
    message={message}
    onAction={onRetry}
    title="No pudimos cargar los Atlas"
  />
);
