import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, type ListRenderItem } from 'react-native';

import { FarmCard } from '../../features/farms/components/FarmCard';
import { FarmsEmptyState } from '../../features/farms/components/FarmsEmptyState';
import { FarmsErrorState } from '../../features/farms/components/FarmsErrorState';
import { FarmsListFooter } from '../../features/farms/components/FarmsListFooter';
import { FarmsListHeader } from '../../features/farms/components/FarmsListHeader';
import { FarmsLoadingState } from '../../features/farms/components/FarmsLoadingState';
import { useFarms } from '../../features/farms/hooks/useFarms';
import type { Farm } from '../../features/farms/types';
import { routes } from '../../shared/config/routes';
import { clearAuthSession } from '../../shared/lib/authSession';
import { ListItemSeparator } from '../../shared/ui/molecules/ListItemSeparator';
import { type UnderlineTabOption } from '../../shared/ui/molecules/UnderlineTabs';
import { MainContainer } from '../../shared/ui/templates/MainContainer';

const FARMS_FILTERS = {
  all: 'all',
  favorites: 'favorites',
} as const;

type FarmsFilter = keyof typeof FARMS_FILTERS;

const DEFAULT_FARMS_ERROR_MESSAGE = 'No pudimos cargar las fincas.';

const FARMS_LIST_ITEM_SEPARATOR_STYLE = {
  height: 16,
};
const FARM_CARD_HEIGHT = 110;

const FARMS_ITEM_LENGTH =
  FARM_CARD_HEIGHT + FARMS_LIST_ITEM_SEPARATOR_STYLE.height;

const farmsTabOptions: UnderlineTabOption<FarmsFilter>[] = [
  {
    indicatorWidthClassName: 'w-[44px]',
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
    FARMS_FILTERS.all
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const { farms, isPending, isError, error, refetch } = useFarms();

  const favoriteFarms = farms.filter((farm) => farm.isFavorite);
  const visibleFarms =
    activeFilter === FARMS_FILTERS.favorites ? favoriteFarms : farms;
  const farmsListData = isPending || isError ? [] : visibleFarms;
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

  const renderFarmCard = useCallback<ListRenderItem<Farm>>(
    ({ item }) => {
      const handlePress = () => {
        router.push(routes.atlas(item.id, item.name));
      };

      return <FarmCard farm={item} onPress={handlePress} />;
    },
    [router]
  );

  const extractFarmKey = useCallback((item: Farm) => item.id, []);

  const getFarmItemLayout = useCallback(
    (_: ArrayLike<Farm> | null | undefined, index: number) => ({
      index,
      length: FARMS_ITEM_LENGTH,
      offset: FARMS_ITEM_LENGTH * index,
    }),
    []
  );

  const listEmptyState = isPending ? (
    <FarmsLoadingState />
  ) : isError ? (
    <FarmsErrorState
      isRetrying={isRetrying}
      message={farmsErrorMessage}
      onRetry={handleRetryPress}
    />
  ) : (
    <FarmsEmptyState activeFilter={activeFilter} />
  );

  return (
    <MainContainer className="px-0 pb-0 pt-0" dismissKeyboardOnPress={false}>
      <FlatList
        data={farmsListData}
        getItemLayout={getFarmItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={extractFarmKey}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={listEmptyState}
        ListFooterComponent={FarmsListFooter}
        ListHeaderComponent={
          <FarmsListHeader
            activeFilter={activeFilter}
            favoritesCount={favoriteFarms.length}
            isLoggingOut={isLoggingOut}
            onChangeFilter={setActiveFilter}
            onLogout={handleLogout}
            options={farmsTabOptions}
            showSeparator={!isPending && !isError && visibleFarms.length > 0}
            totalCount={farms.length}
          />
        }
        renderItem={renderFarmCard}
        showsVerticalScrollIndicator={false}
        windowSize={11}
      />
    </MainContainer>
  );
};

export default FincasRoute;
