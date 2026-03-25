import { View } from 'react-native';

import { cn } from '../../lib/cn';

type GlowOrbTone = 'medium' | 'soft';

type GlowOrbProps = {
  className?: string;
  tone?: GlowOrbTone;
};

const toneClasses: Record<GlowOrbTone, string> = {
  medium: 'bg-accent-glow-medium',
  soft: 'bg-accent-glow-soft',
};

export const GlowOrb = ({ className, tone = 'medium' }: GlowOrbProps) => (
  <View className={cn('absolute rounded-full', toneClasses[tone], className)} />
);
