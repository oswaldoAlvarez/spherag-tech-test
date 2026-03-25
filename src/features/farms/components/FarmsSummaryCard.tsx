import { View } from 'react-native';

import { TextView } from '../../../shared/ui/atoms/TextView';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type FarmsSummaryCardProps = {
  favoritesCount: number;
  totalCount: number;
};

export const FarmsSummaryCard = ({
  favoritesCount,
  totalCount,
}: FarmsSummaryCardProps) => {
  return (
    <SurfaceCard className="mt-6 flex-row" variant="muted">
      <View className="mr-4 h-9 w-9 rounded-full bg-accent" />
      <View className="flex-1">
        <TextView variant="button">{`${totalCount} fincas conectadas`}</TextView>
        <TextView className="mt-1" tone="secondary" variant="caption">
          {`${favoritesCount} favoritas listas para revisar`}
        </TextView>
      </View>
    </SurfaceCard>
  );
};
