import { Alert } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { LoginForm } from '../LoginForm';
import { useLoginForm } from '../../hooks/useLoginForm';

jest.mock('../../hooks/useLoginForm');

const mockUseLoginForm = jest.mocked(useLoginForm);

describe('LoginForm', () => {
  const createHookState = () => ({
    email: '',
    password: '',
    passwordRef: { current: null },
    isError: false,
    isPending: false,
    isSubmitDisabled: false,
    errorMessage: '',
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    focusPassword: jest.fn(),
    submit: jest.fn(),
  });

  beforeEach(() => {
    mockUseLoginForm.mockReturnValue(createHookState());
  });

  it('renders the auth fields and primary action', () => {
    render(<LoginForm />);

    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Contraseña')).toBeTruthy();
    expect(screen.getByText('Continuar')).toBeTruthy();
  });

  it('shows the hook error message when login fails', () => {
    mockUseLoginForm.mockReturnValue({
      ...createHookState(),
      isError: true,
      errorMessage: 'Credenciales inválidas',
    });

    render(<LoginForm />);

    expect(screen.getByText('Credenciales inválidas')).toBeTruthy();
  });

  it('submits the form when pressing the main button', () => {
    const submit = jest.fn();

    mockUseLoginForm.mockReturnValue({
      ...createHookState(),
      submit,
    });

    render(<LoginForm />);
    fireEvent.press(screen.getByText('Continuar'));

    expect(submit).toHaveBeenCalledTimes(1);
  });

  it('shows the construction alert for recovery', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

    render(<LoginForm />);
    fireEvent.press(screen.getByText('No recuerdo mis datos'));

    expect(alertSpy).toHaveBeenCalledWith(
      'En construcción',
      'La recuperación de acceso estará disponible próximamente.'
    );

    alertSpy.mockRestore();
  });
});
