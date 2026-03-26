import { Pressable, View } from 'react-native';

import { TextView } from '../../../shared/ui/atoms/TextView';

type MapZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
};

export const MapZoomControls = ({
  onZoomIn,
  onZoomOut,
}: MapZoomControlsProps) => (
  <View className="absolute right-3 top-3 gap-2">
    <Pressable
      accessibilityLabel="Acercar mapa"
      className="h-10 w-10 items-center justify-center rounded-full bg-overlay"
      onPress={onZoomIn}
    >
      <TextView variant="button">+</TextView>
    </Pressable>

    <Pressable
      accessibilityLabel="Alejar mapa"
      className="h-10 w-10 items-center justify-center rounded-full bg-overlay"
      onPress={onZoomOut}
    >
      <TextView variant="button">-</TextView>
    </Pressable>
  </View>
);
