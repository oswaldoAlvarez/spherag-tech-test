import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { LoginForm } from '../../features/auth/components/LoginForm';
import { BrandMark } from '../../shared/ui/atoms/BrandMark';
import { TextView } from '../../shared/ui/atoms/TextView';
import { MainContainer } from '../../shared/ui/templates/MainContainer';

const LoginRoute = () => {
  const router = useRouter();

  return (
    <MainContainer scroll>
      <View className="relative">
        <View className="absolute left-72 top-6 h-72 w-72 rounded-full bg-accent-glow-medium" />
        <View className="absolute right-60 top-60 h-80 w-80 rounded-full bg-accent-glow-soft" />

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

        <LoginForm
          className="mt-16 pb-8"
          onLoginSuccess={() => router.replace('/home')}
        />
      </View>
    </MainContainer>
  );
};

export default LoginRoute;
