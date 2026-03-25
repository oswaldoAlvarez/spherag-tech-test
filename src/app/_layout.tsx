import '../../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { QueryProvider } from '../shared/providers/QueryProvider';

if (__DEV__) {
  // Reactotron stays development-only and never ships in production bundles.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../shared/config/reactotron');
}

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
