import { TextView } from '../atoms/TextView';
import { Button } from './Button';
import { SurfaceCard } from './SurfaceCard';

type FeedbackCardProps = {
  actionLabel?: string;
  actionLoading?: boolean;
  message: string;
  onAction?: () => void;
  title: string;
};

export const FeedbackCard = ({
  actionLabel,
  actionLoading = false,
  message,
  onAction,
  title,
}: FeedbackCardProps) => (
  <SurfaceCard className="mt-6">
    <TextView variant="button">{title}</TextView>
    <TextView className="mt-2" tone="secondary">
      {message}
    </TextView>
    {actionLabel && onAction ? (
      <Button
        className="mt-5"
        label={actionLabel}
        loading={actionLoading}
        onPress={onAction}
      />
    ) : null}
  </SurfaceCard>
);
