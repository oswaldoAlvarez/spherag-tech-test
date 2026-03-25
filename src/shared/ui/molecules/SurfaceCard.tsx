import { type ReactNode } from 'react';
import { View } from 'react-native';

import { cn } from '../../lib/cn';

type SurfaceCardVariant = 'default' | 'muted';

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  variant?: SurfaceCardVariant;
};

const surfaceCardClasses: Record<SurfaceCardVariant, string> = {
  default:
    'rounded-[24px] border border-border-default bg-surface-900 px-5 py-5',
  muted: 'rounded-[24px] bg-surface-800 px-5 py-4',
};

export const SurfaceCard = ({
  children,
  className,
  variant = 'default',
}: SurfaceCardProps) => {
  return (
    <View className={cn(surfaceCardClasses[variant], className)}>
      {children}
    </View>
  );
};
