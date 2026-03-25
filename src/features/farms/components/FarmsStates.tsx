import { View } from 'react-native';

import { Button } from '../../../shared/ui/molecules/Button';
import { TextView } from '../../../shared/ui/atoms/TextView';

type FarmsFilter = 'favorites' | 'all';

const arrQuantity = [0, 1, 2];

export const FarmsLoadingState = () => (
  <View className="mt-6 gap-4">
    {arrQuantity.map((item) => (
      <View
        key={item}
        className="h-[102px] rounded-[24px] border border-border-default bg-surface-900"
      />
    ))}
  </View>
);

export const FarmsErrorState = ({
  isRetrying = false,
  message,
  onRetry,
}: {
  isRetrying?: boolean;
  message: string;
  onRetry: () => void;
}) => (
  <View className="mt-6 rounded-[24px] border border-border-default bg-surface-900 px-5 py-5">
    <TextView variant="button">No pudimos cargar las fincas</TextView>
    <TextView className="mt-2" tone="secondary">
      {message}
    </TextView>
    <Button
      className="mt-5"
      label={isRetrying ? 'Reintentando...' : 'Reintentar'}
      loading={isRetrying}
      onPress={onRetry}
    />
  </View>
);

export const FarmsEmptyState = ({
  activeFilter,
}: {
  activeFilter: FarmsFilter;
}) => (
  <View className="mt-6 rounded-[24px] border border-border-default bg-surface-900 px-5 py-5">
    <TextView variant="button">
      {activeFilter === 'favorites'
        ? 'No hay favoritas por mostrar'
        : 'No hay fincas disponibles'}
    </TextView>
    <TextView className="mt-2" tone="secondary">
      {activeFilter === 'favorites'
        ? 'Prueba cambiando a la vista de todas para revisar el resto del listado.'
        : 'Cuando haya sistemas disponibles, se mostrarán aquí.'}
    </TextView>
  </View>
);
