import { FeedbackCard } from '../../../shared/ui/molecules/FeedbackCard';

type AtlasDetailErrorStateProps = {
  isRetrying?: boolean;
  message: string;
  onRetry: () => void;
};

export const AtlasDetailErrorState = ({
  isRetrying = false,
  message,
  onRetry,
}: AtlasDetailErrorStateProps) => (
  <FeedbackCard
    actionLabel={isRetrying ? 'Reintentando...' : 'Reintentar'}
    actionLoading={isRetrying}
    message={message}
    onAction={onRetry}
    title="No pudimos cargar el detalle del Atlas"
  />
);
