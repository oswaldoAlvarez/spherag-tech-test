import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { colors } from '../../theme/colors';

const LARGE_RADIUS = 999;
const PRIMARY_GLOW_SIZE = 320;
const PRIMARY_GLOW_LEFT = -40;
const PRIMARY_GLOW_TOP = -24;
const SECONDARY_GLOW_SIZE = 360;
const SECONDARY_GLOW_RIGHT = -120;
const SECONDARY_GLOW_TOP = 96;

const styles = StyleSheet.create({
  primaryGlow: {
    borderRadius: LARGE_RADIUS,
    height: PRIMARY_GLOW_SIZE,
    left: PRIMARY_GLOW_LEFT,
    position: 'absolute',
    top: PRIMARY_GLOW_TOP,
    width: PRIMARY_GLOW_SIZE,
  },
  secondaryGlow: {
    borderRadius: LARGE_RADIUS,
    height: SECONDARY_GLOW_SIZE,
    position: 'absolute',
    right: SECONDARY_GLOW_RIGHT,
    top: SECONDARY_GLOW_TOP,
    width: SECONDARY_GLOW_SIZE,
  },
});

export const ScreenGradientBackground = () => (
  <View
    className="absolute inset-0 overflow-hidden bg-background"
    pointerEvents="none"
  >
    <LinearGradient
      colors={[
        colors.backgroundHighlight,
        colors.backgroundElevated,
        colors.background,
      ]}
      locations={[0, 0.36, 1]}
      start={{ x: 0.2, y: 0 }}
      style={StyleSheet.absoluteFill}
      end={{ x: 0.5, y: 1 }}
    />

    <LinearGradient
      colors={[
        colors.glowPrimaryStrong,
        colors.glowPrimaryMedium,
        colors.glowPrimarySoft,
        'transparent',
      ]}
      locations={[0, 0.35, 0.72, 1]}
      start={{ x: 0.2, y: 0.15 }}
      style={styles.primaryGlow}
      end={{ x: 0.85, y: 0.85 }}
    />

    <LinearGradient
      colors={[
        colors.glowSecondaryStrong,
        colors.glowSecondaryMedium,
        colors.glowSecondarySoft,
        'transparent',
      ]}
      locations={[0, 0.38, 0.74, 1]}
      start={{ x: 0.1, y: 0.1 }}
      style={styles.secondaryGlow}
      end={{ x: 0.9, y: 0.9 }}
    />
  </View>
);
