import { FeedbackCard } from '../../../shared/ui/molecules/FeedbackCard';

type AtlasEmptyStateProps = {
  farmName?: string;
};

export const AtlasEmptyState = ({ farmName }: AtlasEmptyStateProps) => (
  <FeedbackCard
    message={
      farmName
        ? `${farmName} todavía no tiene Atlas asociados.`
        : 'Esta finca todavía no tiene Atlas asociados.'
    }
    title="No hay Atlas disponibles"
  />
);
