import { View } from 'react-native';

import { TextView } from '../../../shared/ui/atoms/TextView';
import { BackButton } from '../../../shared/ui/molecules/BackButton';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type AtlasListHeaderProps = {
  currentPage: number;
  onBack: () => void;
  selectedFarmName: string;
  showSeparator: boolean;
  totalCount: number;
  totalPages: number;
};

const HEADER_SEPARATOR_HEIGHT = 16;

export const AtlasListHeader = ({
  currentPage,
  onBack,
  selectedFarmName,
  showSeparator,
  totalCount,
  totalPages,
}: AtlasListHeaderProps) => (
  <View>
    <View className="flex-row items-center justify-between pt-4">
      <BackButton onPress={onBack} />
    </View>

    <View className="mt-8">
      <TextView variant="title">Atlas</TextView>
      <TextView className="mt-3" tone="secondary">
        {`Dispositivos vinculados a ${selectedFarmName}.`}
      </TextView>
    </View>

    <SurfaceCard className="mt-6" variant="muted">
      <TextView variant="button">{`${totalCount} Atlas conectados`}</TextView>
      <TextView className="mt-1" tone="secondary" variant="caption">
        {`Página ${currentPage} de ${Math.max(totalPages, 1)}`}
      </TextView>
    </SurfaceCard>

    {showSeparator ? (
      <View style={{ height: HEADER_SEPARATOR_HEIGHT }} />
    ) : null}
  </View>
);
