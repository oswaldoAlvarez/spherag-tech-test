import { ActivityIndicator, Pressable } from 'react-native';

import { cn } from '../../lib/cn';
import { colors } from '../../theme/colors';
import { TextView } from '../atoms/TextView';

type ButtonVariant = 'primary' | 'transparent';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress: () => void;
  variant?: ButtonVariant;
};

const containerClasses: Record<ButtonVariant, string> = {
  primary:
    'min-h-[58px] items-center justify-center rounded-[18px] bg-button-primary',
  transparent: 'items-center justify-center bg-transparent',
};

const labelTone: Record<ButtonVariant, 'accent' | 'dark'> = {
  primary: 'dark',
  transparent: 'accent',
};

export const Button = ({
  className,
  disabled = false,
  label,
  loading = false,
  onPress,
  variant = 'primary',
}: ButtonProps) => {
  const isInactive = disabled || loading;

  return (
    <Pressable
      className={cn(
        containerClasses[variant],
        className,
      )}
      android_ripple={
        variant === 'primary'
          ? { color: colors.rippleDarkSoft, borderless: false }
          : undefined
      }
      disabled={isInactive}
      onPress={onPress}
      style={isInactive ? { opacity: 0.6 } : undefined}
    >
      {loading && variant === 'primary' ? (
        <ActivityIndicator color={colors.textDark} />
      ) : (
        <TextView
          align="center"
          tone={labelTone[variant]}
          variant={variant === 'primary' ? 'button' : 'body'}
        >
          {label}
        </TextView>
      )}
    </Pressable>
  );
};
