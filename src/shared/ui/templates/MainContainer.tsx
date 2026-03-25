import { type ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '../../lib/cn';
import { ScreenGradientBackground } from '../atoms/ScreenGradientBackground';

type MainContainerProps = {
  children: ReactNode;
  className?: string;
  dismissKeyboardOnPress?: boolean;
  scroll?: boolean;
  keyboardVerticalOffset?: number;
};

export const MainContainer = ({
  children,
  className,
  dismissKeyboardOnPress = true,
  scroll = false,
  keyboardVerticalOffset = 0,
}: MainContainerProps) => {
  const contentClassName = cn('flex-grow px-gutter pb-10 pt-4', className);

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : 'height';

  const content = scroll ? (
    <ScrollView
      bounces={false}
      className="flex-1"
      contentContainerClassName={contentClassName}
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={cn('flex-1 px-gutter pb-10 pt-4', className)}>
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScreenGradientBackground />
      <KeyboardAvoidingView
        behavior={keyboardBehavior}
        className="flex-1"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {dismissKeyboardOnPress ? (
          <TouchableWithoutFeedback
            accessible={false}
            onPress={Keyboard.dismiss}
          >
            {content}
          </TouchableWithoutFeedback>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
