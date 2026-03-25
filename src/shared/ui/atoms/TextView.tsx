import {
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';

import { cn } from '../../lib/cn';

type TextViewVariant = 'title' | 'body' | 'label' | 'caption' | 'button';
type TextViewTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'danger'
  | 'dark';
type TextViewAlign = 'left' | 'center' | 'right';

type TextViewProps = TextProps & {
  variant?: TextViewVariant;
  tone?: TextViewTone;
  align?: TextViewAlign;
  className?: string;
};

const variantClasses: Record<TextViewVariant, string> = {
  title: 'text-[34px] leading-[38px]',
  body: 'text-[15px] leading-[22px]',
  label: 'text-[13px] leading-[18px]',
  caption: 'text-xs leading-4',
  button: 'text-base leading-5',
};

const toneClasses: Record<TextViewTone, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  accent: 'text-accent',
  danger: 'text-danger',
  dark: 'text-text-dark',
};

const alignClasses: Record<TextViewAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const variantStyles: Record<TextViewVariant, StyleProp<TextStyle>> = {
  title: { fontFamily: 'Nunito_800ExtraBold' },
  body: { fontFamily: 'Nunito_500Medium' },
  label: { fontFamily: 'Nunito_600SemiBold' },
  caption: { fontFamily: 'Nunito_600SemiBold' },
  button: { fontFamily: 'Nunito_700Bold' },
};

export const TextView = ({
  variant = 'body',
  tone = 'primary',
  align = 'left',
  className,
  ...props
}: TextViewProps) => (
  <Text
    className={cn(
      variantClasses[variant],
      toneClasses[tone],
      alignClasses[align],
      className
    )}
    style={variantStyles[variant]}
    {...props}
  />
);
