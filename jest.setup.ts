/* eslint-disable @typescript-eslint/no-require-imports */
jest.mock('react-native-safe-area-context', () =>
  jest.requireActual('react-native-safe-area-context/jest/mock')
);

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    Ionicons: ({ name, ...props }: { name: string; [key: string]: unknown }) =>
      React.createElement(Text, props, name),
  };
});

jest.mock('expo-router', () => {
  return {
    Redirect: () => null,
    Stack: {
      Screen: () => null,
    },
    useLocalSearchParams: jest.fn(),
    useRouter: jest.fn(),
  };
});
