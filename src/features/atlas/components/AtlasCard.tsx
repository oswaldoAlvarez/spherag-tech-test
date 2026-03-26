import { memo } from 'react';
import { Pressable, View } from 'react-native';

import type { AtlasDevice } from '../types';
import { AtlasMetricsRow } from './AtlasMetricsRow';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';

type AtlasCardProps = {
  atlas: AtlasDevice;
  onPress?: () => void;
};

const AtlasCardComponent = ({ atlas, onPress }: AtlasCardProps) => {
  return (
    <Pressable accessibilityRole="button" disabled={!onPress} onPress={onPress}>
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

        <AtlasMetricsRow
          batteryPercentage={atlas.batteryPercentage}
          signalPercentage={atlas.signalPercentage}
        />

        <TextView
          className="mt-auto pt-[22px]"
          tone="secondary"
          variant="caption"
        >
          {atlas.expiredDateLabel}
        </TextView>
      </SurfaceCard>
    </Pressable>
  );
};

export const AtlasCard = memo(AtlasCardComponent);
