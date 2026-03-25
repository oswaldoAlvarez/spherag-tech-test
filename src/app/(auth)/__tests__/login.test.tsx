/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import LoginRoute from '../login';

const mockUseRouter = jest.mocked(useRouter);

jest.mock('../../../shared/ui/templates/MainContainer', () => ({
  MainContainer: ({ children }: { children: unknown }) => {
    const React = require('react');
    const { View } = require('react-native');

    return React.createElement(View, null, children);
  },
}));

jest.mock('../../../features/auth/components/LoginForm', () => ({
  LoginForm: () => {
    const React = require('react');
    const { View, Text } = require('react-native');

    return React.createElement(
      View,
      null,
      React.createElement(Text, null, 'Continuar'),
      React.createElement(Text, null, 'No recuerdo mis datos')
    );
  },
}));

describe('LoginRoute', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      back: jest.fn(),
      canDismiss: jest.fn(),
      canGoBack: jest.fn(),
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
      dismissTo: jest.fn(),
      navigate: jest.fn(),
      push: jest.fn(),
      replace: jest.fn(),
      setParams: jest.fn(),
    } as never);
  });

  it('renders the login screen copy and actions', () => {
    render(<LoginRoute />);

    expect(screen.getByText('Inicia sesión')).toBeTruthy();
    expect(
      screen.getByText('Ingresa tu correo y contraseña para continuar.')
    ).toBeTruthy();
    expect(screen.getByText('Continuar')).toBeTruthy();
    expect(screen.getByText('No recuerdo mis datos')).toBeTruthy();
  });
});
