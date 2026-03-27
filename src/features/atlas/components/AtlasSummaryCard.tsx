import { Pressable, View } from 'react-native';

import { AtlasMetricsRow } from './AtlasMetricsRow';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';
import { cn } from '../../../shared/lib/cn';

type AtlasSummaryCardProps = {
  batteryPercentage: number;
  className?: string;
  expiredDateLabel: string;
  imei: string;
  onPress?: () => void;
  signalPercentage: number;
  tagLabel?: string;
  title: string;
  titleNumberOfLines?: number;
};

export const AtlasSummaryCard = ({
  batteryPercentage,
  className,
  expiredDateLabel,
  imei,
  onPress,
  signalPercentage,
  tagLabel,
  title,
  titleNumberOfLines = 1,
}: AtlasSummaryCardProps) => {
  const content = (
    <SurfaceCard className={cn(className)}>
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <TextView numberOfLines={titleNumberOfLines} variant="button">
            {title}
          </TextView>
          <TextView
            className="mt-1"
            numberOfLines={1}
            tone="secondary"
            variant="caption"
          >
            {`IMEI ${imei}`}
          </TextView>
        </View>

        {tagLabel ? (
          <TextView className="self-start" tone="accent" variant="caption">
            {tagLabel}
          </TextView>
        ) : null}
      </View>

      <AtlasMetricsRow
        batteryPercentage={batteryPercentage}
        signalPercentage={signalPercentage}
      />

      <TextView className="mt-4" tone="secondary" variant="caption">
        {expiredDateLabel}
      </TextView>
    </SurfaceCard>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {content}
    </Pressable>
  );
};
