import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, type PressableProps, View } from 'react-native';

import type { Farm, FarmAccent } from '../types';
import { cn } from '../../../shared/lib/cn';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { colors } from '../../../shared/theme/colors';

const accentClasses: Record<FarmAccent, string> = {
  green: 'bg-farm-green',
  blue: 'bg-farm-blue',
  amber: 'bg-farm-amber',
  teal: 'bg-farm-teal',
};

const CARD_PRESS_OPACITY = 0.94;
const CARD_INTERACTION_SCALE = 0.985;

export const FarmCard = ({ farm }: { farm: Farm }) => {
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
      className="h-[110px] flex-row items-stretch rounded-[24px] border border-border-default bg-surface-900 px-4 py-4"
      style={getCardInteractionStyle}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
      <View
        className={cn(
          'w-16 self-stretch rounded-[18px]',
          accentClasses[farm.accent]
        )}
      />

      <View className="ml-4 flex-1 justify-center py-0.5">
        <TextView variant="button">{farm.name}</TextView>
        <TextView className="mt-1" tone="secondary" variant="caption">
          {farm.createdDateLabel}
        </TextView>

        {farm.isFavorite ? (
          <View className="mt-3 self-start rounded-full bg-farm-favorite-surface px-3 py-1.5">
            <TextView className="text-[11px] leading-[13px]" tone="accent">
              Favorita
            </TextView>
          </View>
        ) : (
          <TextView className="mt-3" tone="muted" variant="caption">
            No favorita
          </TextView>
        )}
      </View>

      <View className="justify-center pl-3">
        <Ionicons color={colors.textPrimary} name="chevron-forward" size={18} />
      </View>
    </Pressable>
  );
};
