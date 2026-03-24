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

type MainContainerProps = {
  children: ReactNode;
  className?: string;
  scroll?: boolean;
  keyboardVerticalOffset?: number;
};

export const MainContainer = ({
  children,
  className,
  scroll = false,
  keyboardVerticalOffset = 0,
}: MainContainerProps) => {
  const contentClassName = cn('flex-grow px-gutter pb-10 pt-4', className);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          {scroll ? (
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
            <View className={cn('flex-1 px-gutter pb-10 pt-4', className)}>{children}</View>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
