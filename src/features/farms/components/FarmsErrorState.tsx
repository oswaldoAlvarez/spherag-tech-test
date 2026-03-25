import { FeedbackCard } from '../../../shared/ui/molecules/FeedbackCard';

type FarmsErrorStateProps = {
  isRetrying?: boolean;
  message: string;
  onRetry: () => void;
};

export const FarmsErrorState = ({
  isRetrying = false,
  message,
  onRetry,
}: FarmsErrorStateProps) => (
  <FeedbackCard
    actionLabel={isRetrying ? 'Reintentando...' : 'Reintentar'}
    actionLoading={isRetrying}
    message={message}
    onAction={onRetry}
    title="No pudimos cargar las fincas"
  />
);
