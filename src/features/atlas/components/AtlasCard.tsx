import { memo } from 'react';
import { View } from 'react-native';

import type { AtlasDevice } from '../types';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { MetricCard } from '../../../shared/ui/molecules/MetricCard';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type AtlasCardProps = {
  atlas: AtlasDevice;
};

const AtlasCardComponent = ({ atlas }: AtlasCardProps) => {
  return (
    <SurfaceCard className="h-[192px]">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <TextView numberOfLines={1} variant="button">
            {atlas.name}
          </TextView>
          <TextView
            className="mt-1"
            numberOfLines={1}
            tone="secondary"
            variant="caption"
          >
            IMEI {atlas.imei}
          </TextView>
        </View>

        <TextView className="self-start" tone="accent" variant="caption">
          Atlas
        </TextView>
      </View>

      <View className="mt-3 flex-row gap-3">
        <MetricCard label="Batería" value={`${atlas.batteryPercentage}%`} />
        <MetricCard label="Señal" value={`${atlas.signalPercentage}%`} />
      </View>

      <TextView
        className="mt-auto pt-[22px]"
        tone="secondary"
        variant="caption"
      >
        {atlas.expiredDateLabel}
      </TextView>
    </SurfaceCard>
  );
};

export const AtlasCard = memo(AtlasCardComponent);
