import { View } from 'react-native';

import { LoginForm } from '../features/auth/ui/LoginForm';
import { BrandMark } from '../shared/ui/atoms/BrandMark';
import { TextView } from '../shared/ui/atoms/TextView';
import { MainContainer } from '../shared/ui/templates/MainContainer';

const LoginRoute = () => (
  <MainContainer className="justify-between" scroll>
    <View className="relative flex-1 justify-between">
      <View className="absolute left-72 top-6 h-72 w-72 rounded-full bg-accent/15" />
      <View className="absolute right-60 top-60 h-80 w-80 rounded-full bg-accent/10" />

      <View className="items-center pt-7">
        <BrandMark />
        <View className="mt-8 items-center">
          <TextView align="center" variant="title">
            Inicia sesión
          </TextView>
          <TextView
            align="center"
            className="mt-3 max-w-[292px]"
            tone="secondary"
          >
            Ingresa tu correo y contraseña para continuar.
          </TextView>
        </View>
      </View>

      <LoginForm className="mt-12" />
    </View>
  </MainContainer>
);

export default LoginRoute;
