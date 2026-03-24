import { Pressable, View, type TextInputSubmitEditingEventData, type NativeSyntheticEvent } from 'react-native';

import { useLoginForm } from '../model/useLoginForm';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { AuthField } from '../../../shared/ui/molecules/AuthField';
import { PrimaryButton } from '../../../shared/ui/molecules/PrimaryButton';

type LoginFormProps = {
  className?: string;
};

export const LoginForm = ({ className }: LoginFormProps) => {
  const {
    email,
    password,
    passwordRef,
    isSubmitDisabled,
    setEmail,
    setPassword,
    focusPassword,
    submit,
  } = useLoginForm();

  const handlePasswordSubmit = (
    _event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    if (!isSubmitDisabled) {
      submit();
    }
  };

  return (
    <View className={className}>
      <View className="gap-4">
        <AuthField
          label="Email"
          placeholder="Ingresa tu email"
          returnKeyType="next"
          type="email"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={focusPassword}
        />
        <AuthField
          ref={passwordRef}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          returnKeyType="done"
          type="password"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handlePasswordSubmit}
        />
      </View>

      <Pressable className="mt-8 items-center" onPress={() => {}}>
        <TextView align="center" tone="accent">
          No recuerdo mis datos
        </TextView>
      </Pressable>

      <View className="mt-10">
        <PrimaryButton
          disabled={isSubmitDisabled}
          label="Continuar"
          onPress={submit}
        />
        <TextView
          align="center"
          className="mt-4"
          tone="muted"
          variant="caption"
        >
          Acceso seguro
        </TextView>
      </View>
    </View>
  );
};
