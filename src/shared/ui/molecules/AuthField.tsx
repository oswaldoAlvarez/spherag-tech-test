import { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  type ReturnKeyTypeOptions,
  type TextInputProps,
} from 'react-native';

import { cn } from '../../lib/cn';
import { TextView } from '../atoms/TextView';

type AuthFieldType = 'email' | 'password';

type AuthFieldProps = {
  label: string;
  value: string;
  type: AuthFieldType;
  placeholder: string;
  returnKeyType?: ReturnKeyTypeOptions;
  onChangeText: (text: string) => void;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
};

export const AuthField = forwardRef<TextInput, AuthFieldProps>(
  (
    {
      label,
      value,
      type,
      placeholder,
      returnKeyType,
      onChangeText,
      onSubmitEditing,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

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
          autoCapitalize="none"
          autoComplete={type === 'email' ? 'email' : 'password'}
          autoCorrect={false}
          className="mt-2 p-0 text-base font-medium text-text-primary"
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          placeholder={placeholder}
          placeholderTextColor="#71807A"
          returnKeyType={returnKeyType}
          secureTextEntry={type === 'password'}
          selectionColor="#19D45F"
          textContentType={type === 'email' ? 'emailAddress' : 'password'}
          value={value}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  }
);

AuthField.displayName = 'AuthField';
