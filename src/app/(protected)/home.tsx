import { View } from 'react-native';

import { TextView } from '../../shared/ui/atoms/TextView';
import { MainContainer } from '../../shared/ui/templates/MainContainer';

const HomeRoute = () => (
  <MainContainer className="justify-center">
    <View className="items-center">
      <TextView align="center" variant="title">
        Home
      </TextView>
      <TextView
        align="center"
        className="mt-3 max-w-[280px]"
        tone="secondary"
      >
        El inicio de sesión fue correcto y la sesión quedó guardada.
      </TextView>
    </View>
  </MainContainer>
);

export default HomeRoute;
