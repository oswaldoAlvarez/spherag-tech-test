import '../../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryProvider } from '../shared/providers/QueryProvider';

const RootLayout = () => {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </QueryProvider>
  );
};

export default RootLayout;
