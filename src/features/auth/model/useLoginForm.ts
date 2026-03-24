import { useRef, useState } from 'react';
import { Alert, Keyboard, TextInput } from 'react-native';

export function useLoginForm() {
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitDisabled = !email.trim() || !password.trim();

  const focusPassword = () => {
    passwordRef.current?.focus();
  };

  const submit = () => {
    Keyboard.dismiss();
    Alert.alert(
      'Inicio de sesión',
      'La pantalla está lista. El siguiente paso es conectar la autenticación.'
    );
  };

  return {
    email,
    password,
    passwordRef,
    isSubmitDisabled,
    setEmail,
    setPassword,
    focusPassword,
    submit,
  };
}
