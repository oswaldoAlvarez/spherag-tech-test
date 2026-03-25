import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';

import { login } from '../api/login';
import { storeAuthSession } from '../../../shared/lib/authSession';

type UseLoginFormOptions = {
  onLoginSuccess?: () => void;
};

export const useLoginForm = ({ onLoginSuccess }: UseLoginFormOptions = {}) => {
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    throwOnError: false,
    onSuccess: async (session) => {
      Keyboard.dismiss();
      await storeAuthSession(session);
      onLoginSuccess?.();
    },
  });

  const isSubmitDisabled =
    !email.trim() || !password.trim() || loginMutation.isPending;

  const focusPassword = () => {
    passwordRef.current?.focus();
  };

  const submit = async () => {
    if (isSubmitDisabled) {
      return;
    }

    setErrorMessage('');

    try {
      await loginMutation.mutateAsync({
        email: email.trim(),
        password,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No pudimos iniciar sesión. Inténtalo otra vez.'
      );
    }
  };

  return {
    email,
    password,
    passwordRef,
    isError: Boolean(errorMessage),
    isPending: loginMutation.isPending,
    isSubmitDisabled,
    errorMessage,
    setEmail,
    setPassword,
    focusPassword,
    submit,
  };
};
