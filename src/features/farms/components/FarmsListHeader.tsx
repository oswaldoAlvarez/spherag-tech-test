import { View } from 'react-native';

import { FarmsSummaryCard } from './FarmsSummaryCard';
import { TextView } from '../../../shared/ui/atoms/TextView';
import { Button } from '../../../shared/ui/molecules/Button';
import {
  UnderlineTabs,
  type UnderlineTabOption,
} from '../../../shared/ui/molecules/UnderlineTabs';

type FarmsListHeaderProps<T extends string> = {
  activeFilter: T;
  favoritesCount: number;
  isLoggingOut: boolean;
  onChangeFilter: (value: T) => void;
  onLogout: () => void;
  options: UnderlineTabOption<T>[];
  showSeparator: boolean;
  totalCount: number;
};

const HEADER_SEPARATOR_HEIGHT = 16;

export const FarmsListHeader = <T extends string>({
  activeFilter,
  favoritesCount,
  isLoggingOut,
  onChangeFilter,
  onLogout,
  options,
  showSeparator,
  totalCount,
}: FarmsListHeaderProps<T>) => (
  <>
    <View className="flex-row items-center justify-between pt-4">
      <TextView variant="title">Fincas</TextView>

      <Button
        className="min-h-0 rounded-full bg-overlay px-4 py-3"
        label={isLoggingOut ? 'Saliendo...' : 'Salir'}
        loading={isLoggingOut}
        onPress={onLogout}
        variant="transparent"
      />
    </View>

    <UnderlineTabs
      activeValue={activeFilter}
      className="mt-6"
      onChange={onChangeFilter}
      options={options}
    />

    <FarmsSummaryCard favoritesCount={favoritesCount} totalCount={totalCount} />

    {showSeparator ? (
      <View style={{ height: HEADER_SEPARATOR_HEIGHT }} />
    ) : null}
  </>
);
