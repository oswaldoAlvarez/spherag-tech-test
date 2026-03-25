import {
  Alert,
  View,
  type TextInputProps,
} from 'react-native';

import { useLoginForm } from '../hooks/useLoginForm';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { AuthField } from '../../../shared/ui/molecules/AuthField';
import { Button } from '../../../shared/ui/molecules/Button';
import { PasswordField } from '../../../shared/ui/molecules/PasswordField';

type LoginFormProps = {
  className?: string;
  onLoginSuccess?: () => void;
};

export const LoginForm = ({ className, onLoginSuccess }: LoginFormProps) => {
  const {
    email,
    password,
    passwordRef,
    isError,
    isPending,
    isSubmitDisabled,
    errorMessage,
    setEmail,
    setPassword,
    focusPassword,
    submit,
  } = useLoginForm({ onLoginSuccess });

  const handlePasswordSubmit: NonNullable<TextInputProps['onSubmitEditing']> = () => {
    submit();
  };

  const handleRecoveryPress = () => {
    Alert.alert(
      'En construcción',
      'La recuperación de acceso estará disponible próximamente.'
    );
  };

  return (
    <View className={className}>
      <View className="gap-4">
        <AuthField
          editable={!isPending}
          label="Email"
          placeholder="Ingresa tu email"
          returnKeyType="next"
          submitBehavior="submit"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={focusPassword}
        />
        <PasswordField
          ref={passwordRef}
          editable={!isPending}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          returnKeyType="done"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handlePasswordSubmit}
        />
      </View>

      {isError ? (
        <TextView className="mt-4" tone="danger">
          {errorMessage}
        </TextView>
      ) : null}

      <Button
        className="mt-10"
        label="No recuerdo mis datos"
        onPress={handleRecoveryPress}
        variant="transparent"
      />

      <View className="mt-10">
        <Button
          disabled={isSubmitDisabled}
          label={isPending ? 'Ingresando...' : 'Continuar'}
          loading={isPending}
          onPress={submit}
          variant="primary"
        />
        <TextView
          align="center"
          className="mt-4"
          tone="muted"
          variant="caption"
        >
          Todos los derechos reservados
        </TextView>
      </View>
    </View>
  );
};
