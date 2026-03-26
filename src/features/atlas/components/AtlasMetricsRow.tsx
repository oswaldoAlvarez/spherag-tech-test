import { View } from 'react-native';

import { MetricCard } from '../../../shared/ui/molecules/MetricCard';

type AtlasMetricsRowProps = {
  batteryPercentage: number;
  signalPercentage: number;
};

export const AtlasMetricsRow = ({
  batteryPercentage,
  signalPercentage,
}: AtlasMetricsRowProps) => (
  <View className="mt-3 flex-row gap-3">
    <MetricCard label="Batería" value={`${batteryPercentage}%`} />
    <MetricCard label="Señal" value={`${signalPercentage}%`} />
  </View>
);
