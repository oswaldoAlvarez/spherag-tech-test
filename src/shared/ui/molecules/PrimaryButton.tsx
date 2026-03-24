import { Pressable } from 'react-native';

import { cn } from '../../lib/cn';
import { TextView } from '../atoms/TextView';

type PrimaryButtonProps = {
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

export const PrimaryButton = ({
  disabled = false,
  label,
  onPress,
}: PrimaryButtonProps) => (
  <Pressable
    className={cn(
      'min-h-[58px] items-center justify-center rounded-[18px] bg-button-primary active:opacity-90',
      disabled && 'opacity-60'
    )}
    disabled={disabled}
    onPress={onPress}
  >
    <TextView variant="button" tone="dark">
      {label}
    </TextView>
  </Pressable>
);
