import { Text, type TextProps } from 'react-native';

import { cn } from '../../lib/cn';

type TextViewVariant = 'title' | 'body' | 'label' | 'caption' | 'button';
type TextViewTone = 'primary' | 'secondary' | 'muted' | 'accent' | 'dark';
type TextViewAlign = 'left' | 'center' | 'right';

type TextViewProps = TextProps & {
  variant?: TextViewVariant;
  tone?: TextViewTone;
  align?: TextViewAlign;
  className?: string;
};

const variantClasses: Record<TextViewVariant, string> = {
  title: 'text-[34px] font-bold leading-[38px]',
  body: 'text-[15px] font-medium leading-[22px]',
  label: 'text-[13px] font-semibold leading-[18px]',
  caption: 'text-xs font-semibold leading-4',
  button: 'text-base font-bold leading-5',
};

const toneClasses: Record<TextViewTone, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  muted: 'text-text-muted',
  accent: 'text-accent',
  dark: 'text-text-dark',
};

const alignClasses: Record<TextViewAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
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
    {...props}
  />
);
