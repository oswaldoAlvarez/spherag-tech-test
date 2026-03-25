import { Ionicons } from '@expo/vector-icons';
import { memo, useState } from 'react';
import { Pressable, type PressableProps, View } from 'react-native';

import type { Farm, FarmAccent } from '../types';
import { cn } from '../../../shared/lib/cn';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { SurfaceCard } from '../../../shared/ui/molecules/SurfaceCard';
import { colors } from '../../../shared/theme/colors';

const accentClasses: Record<FarmAccent, string> = {
  green: 'bg-farm-green',
  blue: 'bg-farm-blue',
  amber: 'bg-farm-amber',
  teal: 'bg-farm-teal',
};

const CARD_PRESS_OPACITY = 0.94;
const CARD_INTERACTION_SCALE = 0.985;

type FarmCardProps = {
  farm: Farm;
  onPress?: () => void;
};

const FarmCardComponent = ({ farm, onPress }: FarmCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverIn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const getCardInteractionStyle: PressableProps['style'] = ({ pressed }) => ({
    opacity: pressed ? CARD_PRESS_OPACITY : 1,
    transform: [{ scale: isHovered || pressed ? CARD_INTERACTION_SCALE : 1 }],
  });

  return (
    <Pressable
      accessibilityRole="button"
      className="h-[100px]"
      disabled={!onPress}
      onPress={onPress}
      style={getCardInteractionStyle}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
      <SurfaceCard className="flex-1 flex-row items-stretch px-4 py-4">
        <View
          className={cn(
            'w-16 self-stretch rounded-[18px]',
            accentClasses[farm.accent]
          )}
        />

        <View className="ml-4 flex-1">
          <TextView variant="button">{farm.name}</TextView>
          <TextView className="mt-1" tone="secondary" variant="caption">
            {farm.createdDateLabel}
          </TextView>

          {farm.isFavorite ? (
            <TextView
              className="mt-auto self-start"
              tone="accent"
              variant="caption"
            >
              Favorita
            </TextView>
          ) : (
            <TextView
              className="mt-auto self-start"
              tone="muted"
              variant="caption"
            >
              No favorita
            </TextView>
          )}
        </View>

        <View className="justify-center pl-3">
          <Ionicons
            color={colors.textPrimary}
            name="chevron-forward"
            size={18}
          />
        </View>
      </SurfaceCard>
    </Pressable>
  );
};

export const FarmCard = memo(FarmCardComponent);
