import { View } from 'react-native';

import type { AtlasDetail } from '../types';
import { AtlasMetricsRow } from './AtlasMetricsRow';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { BackButton } from '../../../shared/ui/molecules/BackButton';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type AtlasDetailSummaryProps = {
  atlas: AtlasDetail;
  farmName: string;
  onBack: () => void;
};

export const AtlasDetailSummary = ({
  atlas,
  farmName,
  onBack,
}: AtlasDetailSummaryProps) => (
  <>
    <View className="flex-row items-center justify-between pt-4">
      <BackButton onPress={onBack} />
    </View>

    <View className="mt-8">
      <TextView variant="title">{atlas.name}</TextView>
      <TextView className="mt-3" tone="secondary">
        {`Detalle del Atlas en ${farmName}.`}
      </TextView>
    </View>

    <SurfaceCard className="mt-6">
      <TextView variant="button">{atlas.productTypeName}</TextView>
      <TextView className="mt-2" tone="secondary" variant="caption">
        {`IMEI ${atlas.imei}`}
      </TextView>
      <AtlasMetricsRow
        batteryPercentage={atlas.batteryPercentage}
        signalPercentage={atlas.signalPercentage}
      />
      <TextView className="mt-4" tone="secondary" variant="caption">
        {atlas.expiredDateLabel}
      </TextView>
    </SurfaceCard>
  </>
);
