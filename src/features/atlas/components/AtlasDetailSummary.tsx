import { View } from 'react-native';

import type { AtlasDetail } from '../types';
import { AtlasSummaryCard } from './AtlasSummaryCard';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { BackButton } from '../../../shared/ui/molecules/BackButton';

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

    <AtlasSummaryCard
      batteryPercentage={atlas.batteryPercentage}
      className="mt-6"
      expiredDateLabel={atlas.expiredDateLabel}
      imei={atlas.imei}
      signalPercentage={atlas.signalPercentage}
      title={atlas.productTypeName}
      titleNumberOfLines={2}
    />
  </>
);
