import { forwardRef, useState } from 'react';
import {
  type KeyboardTypeOptions,
  TextInput,
  View,
  type ReturnKeyTypeOptions,
  type TextInputProps,
} from 'react-native';

import { cn } from '../../lib/cn';
import { colors } from '../../theme/colors';
import { TextView } from '../atoms/TextView';

type AuthFieldProps = {
  editable?: boolean;
  label: string;
  value: string;
  placeholder: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  autoCorrect?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  submitBehavior?: TextInputProps['submitBehavior'];
  textContentType?: TextInputProps['textContentType'];
  onChangeText: (text: string) => void;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
};

export const AuthField = forwardRef<TextInput, AuthFieldProps>(
  (
    {
      editable = true,
      label,
      value,
      placeholder,
      autoCapitalize = 'none',
      autoComplete = 'email',
      autoCorrect = false,
      keyboardType = 'email-address',
      returnKeyType,
      submitBehavior,
      textContentType = 'emailAddress',
      onChangeText,
      onSubmitEditing,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    return (
      <View
        className={cn(
          'rounded-[22px] border bg-surface-800 px-4 py-3',
          isFocused ? 'border-border-accent' : 'border-border-default'
        )}
      >
        <TextView variant="label" tone="secondary">
          {label}
        </TextView>
        <TextInput
          ref={ref}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          className="mt-2 p-0 text-base font-medium text-text-primary"
          editable={editable}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          returnKeyType={returnKeyType}
          selectionColor={colors.accent}
          submitBehavior={submitBehavior}
          textContentType={textContentType}
          value={value}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

AuthField.displayName = 'AuthField';
