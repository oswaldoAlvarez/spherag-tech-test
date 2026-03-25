import { View } from 'react-native';

type SkeletonCardListProps = {
  count?: number;
  itemHeight: number;
};

export const SkeletonCardList = ({
  count = 3,
  itemHeight,
}: SkeletonCardListProps) => (
  <View className="mt-6 gap-4">
    {Array.from({ length: count }, (_, index) => (
      <View
        key={index}
        className="rounded-[24px] border border-border-default bg-surface-900"
        style={{ height: itemHeight }}
      />
    ))}
  </View>
);
