import { TextView } from '../../../shared/ui/atoms/TextView';
import { Button } from '../../../shared/ui/molecules/Button';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type AtlasPaginationProps = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalPages: number;
};

export const AtlasPagination = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  totalPages,
}: AtlasPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <SurfaceCard
      className="mt-6 flex-row items-center justify-between gap-4"
      variant="muted"
    >
      <Button
        className="min-h-0 rounded-full bg-overlay px-4 py-3"
        disabled={!hasPreviousPage}
        label="Anterior"
        onPress={onPreviousPage}
        variant="transparent"
      />

      <TextView align="center" tone="secondary" variant="label">
        {`Página ${currentPage} de ${totalPages}`}
      </TextView>

      <Button
        className="min-h-0 rounded-full bg-overlay px-4 py-3"
        disabled={!hasNextPage}
        label="Siguiente"
        onPress={onNextPage}
        variant="transparent"
      />
    </SurfaceCard>
  );
};
