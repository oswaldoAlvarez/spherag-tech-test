import { Pressable, View } from 'react-native';

import { cn } from '../../lib/cn';
import { TextView } from '../atoms/TextView';

export type UnderlineTabOption<T extends string> = {
  indicatorWidthClassName: string;
  label: string;
  value: T;
};

type UnderlineTabsProps<T extends string> = {
  activeValue: T;
  className?: string;
  onChange: (value: T) => void;
  options: UnderlineTabOption<T>[];
};

export const UnderlineTabs = <T extends string>({
  activeValue,
  className,
  onChange,
  options,
}: UnderlineTabsProps<T>) => (
  <View className={cn('flex-row gap-6', className)}>
    {options.map((option) => {
      const isActive = option.value === activeValue;

      const handlePress = () => {
        onChange(option.value);
      };

      return (
        <Pressable key={option.value} onPress={handlePress}>
          <TextView
            className={cn('text-[16px] leading-5', !isActive && 'opacity-55')}
            variant="label"
          >
            {option.label}
          </TextView>
          <View className={cn('mt-2 h-[2px]', isActive && 'bg-text-primary')} />
        </Pressable>
      );
    })}
  </View>
);
