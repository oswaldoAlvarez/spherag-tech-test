import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, View } from 'react-native';

import { FarmCard } from '../../features/farms/components/FarmCard';
import {
  FarmsEmptyState,
  FarmsErrorState,
  FarmsLoadingState,
} from '../../features/farms/components/FarmsStates';
import { useFarms } from '../../features/farms/hooks/useFarms';
import type { Farm } from '../../features/farms/types';
import { routes } from '../../shared/config/routes';
import { clearAuthSession } from '../../shared/lib/authSession';
import { cn } from '../../shared/lib/cn';
import { GlowOrb } from '../../shared/ui/atoms/GlowOrb';
import { TextView } from '../../shared/ui/atoms/TextView';
import { Button } from '../../shared/ui/molecules/Button';
import {
  UnderlineTabs,
  type UnderlineTabOption,
} from '../../shared/ui/molecules/UnderlineTabs';
import { MainContainer } from '../../shared/ui/templates/MainContainer';

const FARMS_FILTERS = {
  all: 'all',
  favorites: 'favorites',
} as const;

type FarmsFilter = keyof typeof FARMS_FILTERS;

const DEFAULT_FARMS_ERROR_MESSAGE = 'No pudimos cargar las fincas.';
const FOOTER_HINT_CLASSNAME_BY_PLATFORM = Platform.select({
  android: 'self-center pb-1',
  default: 'self-center pb-6',
});

const farmsTabOptions: UnderlineTabOption<FarmsFilter>[] = [
  {
    indicatorWidthClassName: 'w-[74px]',
    label: 'Favoritas',
    value: FARMS_FILTERS.favorites,
  },
  {
    indicatorWidthClassName: 'w-[48px]',
    label: 'Todas',
    value: FARMS_FILTERS.all,
  },
];

const FincasRoute = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeFilter, setActiveFilter] = useState<FarmsFilter>(
    FARMS_FILTERS.favorites
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const { farms, isPending, isError, error, refetch } = useFarms();

  const favoriteFarms = farms.filter((farm) => farm.isFavorite);
  const visibleFarms =
    activeFilter === FARMS_FILTERS.favorites ? favoriteFarms : farms;
  const farmsErrorMessage =
    error instanceof Error ? error.message : DEFAULT_FARMS_ERROR_MESSAGE;

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await clearAuthSession();
      queryClient.clear();
      router.replace(routes.login);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);

    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  const handleRetryPress = () => {
    void handleRetry();
  };

  const renderFarmCard = (farm: Farm) => {
    return <FarmCard key={farm.id} farm={farm} />;
  };

  return (
    <MainContainer scroll className="pb-16">
      <View className="relative">
        <GlowOrb className="left-36 top-2 h-72 w-72" tone="medium" />
        <GlowOrb className="-right-16 top-40 h-72 w-72" tone="soft" />

        <View className="flex-row items-center justify-between pt-4">
          <TextView variant="title">Fincas</TextView>

          <Button
            className="min-h-0 rounded-full bg-overlay px-4 py-3"
            label={isLoggingOut ? 'Saliendo...' : 'Salir'}
            loading={isLoggingOut}
            onPress={handleLogout}
            variant="transparent"
          />
        </View>

        <UnderlineTabs
          activeValue={activeFilter}
          className="mt-6"
          onChange={setActiveFilter}
          options={farmsTabOptions}
        />

        <View className="mt-6 flex-row rounded-[24px] bg-surface-800 px-5 py-4">
          <View className="mr-4 h-9 w-9 rounded-full bg-accent" />
          <View className="flex-1">
            <TextView variant="button">{`${farms.length} fincas conectadas`}</TextView>
            <TextView className="mt-1" tone="secondary" variant="caption">
              {`${favoriteFarms.length} favoritas listas para revisar`}
            </TextView>
          </View>
        </View>

        <View className="mt-6 min-h-[560px] justify-between">
          <View>
            {isPending ? (
              <FarmsLoadingState />
            ) : isError ? (
              <FarmsErrorState
                isRetrying={isRetrying}
                message={farmsErrorMessage}
                onRetry={handleRetryPress}
              />
            ) : visibleFarms.length === 0 ? (
              <FarmsEmptyState activeFilter={activeFilter} />
            ) : (
              <View className="gap-4">{visibleFarms.map(renderFarmCard)}</View>
            )}
          </View>

          <TextView
            align="center"
            className={cn(FOOTER_HINT_CLASSNAME_BY_PLATFORM)}
            tone="secondary"
            variant="label"
          >
            Selecciona una finca para ver sus Atlas.
          </TextView>
        </View>
      </View>
    </MainContainer>
  );
};

export default FincasRoute;
