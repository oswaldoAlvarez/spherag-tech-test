import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  type ReturnKeyTypeOptions,
  type TextInputProps,
} from 'react-native';

import { cn } from '../../lib/cn';
import { colors } from '../../theme/colors';
import { TextView } from '../atoms/TextView';

type PasswordFieldProps = {
  editable?: boolean;
  label: string;
  value: string;
  placeholder: string;
  returnKeyType?: ReturnKeyTypeOptions;
  onChangeText: (text: string) => void;
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
};

export const PasswordField = forwardRef<TextInput, PasswordFieldProps>(
  (
    {
      editable = true,
      label,
      value,
      placeholder,
      returnKeyType,
      onChangeText,
      onSubmitEditing,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

        <View className="mt-2 flex-row items-center">
          <TextInput
            ref={ref}
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            className="flex-1 p-0 text-base font-medium text-text-primary"
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            returnKeyType={returnKeyType}
            secureTextEntry={!isVisible}
            selectionColor={colors.accent}
            textContentType="password"
            value={value}
            onBlur={() => setIsFocused(false)}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onSubmitEditing={onSubmitEditing}
          />

          <Pressable
            className="ml-3 h-9 w-9 items-center justify-center rounded-full bg-surface-700"
            disabled={!editable}
            hitSlop={8}
            onPress={() => setIsVisible((current) => !current)}
          >
            <Ionicons
              color={colors.textSecondary}
              name={isVisible ? 'eye-off-outline' : 'eye-outline'}
              size={18}
            />
          </Pressable>
        </View>
      </View>
    );
  }
);

PasswordField.displayName = 'PasswordField';
