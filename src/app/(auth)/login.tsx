import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { LoginForm } from '../../features/auth/components/LoginForm';
import { routes } from '../../shared/config/routes';
import { BrandMark } from '../../shared/ui/atoms/BrandMark';
import { GlowOrb } from '../../shared/ui/atoms/GlowOrb';
import { TextView } from '../../shared/ui/atoms/TextView';
import { MainContainer } from '../../shared/ui/templates/MainContainer';

const LoginRoute = () => {
  const router = useRouter();
  const redirectToFincas = () => {
    router.replace(routes.fincas);
  };

  return (
    <MainContainer scroll>
      <View className="relative">
        <GlowOrb className="left-72 top-6 h-72 w-72" tone="medium" />
        <GlowOrb className="right-60 top-60 h-80 w-80" tone="soft" />

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

        <LoginForm className="mt-16 pb-8" onLoginSuccess={redirectToFincas} />
      </View>
    </MainContainer>
  );
};

export default LoginRoute;
