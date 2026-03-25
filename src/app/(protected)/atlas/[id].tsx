import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, type ListRenderItem } from 'react-native';

import { AtlasCard } from '../../../features/atlas/components/AtlasCard';
import { AtlasEmptyState } from '../../../features/atlas/components/AtlasEmptyState';
import { AtlasErrorState } from '../../../features/atlas/components/AtlasErrorState';
import { AtlasListFooter } from '../../../features/atlas/components/AtlasListFooter';
import { AtlasListHeader } from '../../../features/atlas/components/AtlasListHeader';
import { AtlasLoadingState } from '../../../features/atlas/components/AtlasLoadingState';
import { useAtlas } from '../../../features/atlas/hooks/useAtlas';
import type { AtlasDevice } from '../../../features/atlas/types';
import { routes } from '../../../shared/config/routes';
import { ListItemSeparator } from '../../../shared/ui/molecules/ListItemSeparator';
import { MainContainer } from '../../../shared/ui/templates/MainContainer';

const DEFAULT_ATLAS_ERROR_MESSAGE =
  'No pudimos cargar los Atlas de esta finca.';

const DEFAULT_FARM_NAME = 'Esta finca';

const ATLAS_LIST_ITEM_SEPARATOR_STYLE = {
  height: 16,
};

const ATLAS_CARD_HEIGHT = 192;

const ATLAS_ITEM_LENGTH =
  ATLAS_CARD_HEIGHT + ATLAS_LIST_ITEM_SEPARATOR_STYLE.height;

const AtlasRoute = () => {
  const router = useRouter();

  const { farmName, id } = useLocalSearchParams<{
    farmName?: string;
    id: string;
  }>();

  const [page, setPage] = useState(1);
  const [isRetrying, setIsRetrying] = useState(false);

  const { atlasItems, error, isError, isPending, pagination, refetch } =
    useAtlas({
      id,
      page,
    });

  const selectedFarmName =
    typeof farmName === 'string' ? farmName : DEFAULT_FARM_NAME;

  const atlasErrorMessage =
    error instanceof Error ? error.message : DEFAULT_ATLAS_ERROR_MESSAGE;

  const atlasListData = isPending || isError ? [] : atlasItems;

  const redirectToFincas = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.fincas);
  };

  const goToNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const goToPreviousPage = () => {
    setPage((currentPage) => currentPage - 1);
  };

  const handleRetry = async () => {
    setIsRetrying(true);

    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  const renderAtlasCard = useCallback<ListRenderItem<AtlasDevice>>(
    ({ item }) => {
      return <AtlasCard atlas={item} />;
    },
    []
  );

  const extractAtlasKey = useCallback((item: AtlasDevice) => item.id, []);

  const getAtlasItemLayout = useCallback(
    (_: ArrayLike<AtlasDevice> | null | undefined, index: number) => ({
      index,
      length: ATLAS_ITEM_LENGTH,
      offset: ATLAS_ITEM_LENGTH * index,
    }),
    []
  );

  const listEmptyState = isPending ? (
    <AtlasLoadingState />
  ) : isError ? (
    <AtlasErrorState
      isRetrying={isRetrying}
      message={atlasErrorMessage}
      onRetry={handleRetry}
    />
  ) : (
    <AtlasEmptyState farmName={selectedFarmName} />
  );

  return (
    <MainContainer className="px-0 pb-0 pt-0" dismissKeyboardOnPress={false}>
      <FlatList
        data={atlasListData}
        getItemLayout={getAtlasItemLayout}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={extractAtlasKey}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={listEmptyState}
        ListFooterComponent={
          <AtlasListFooter
            currentPage={pagination.currentPage}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
            totalPages={pagination.totalPages}
          />
        }
        ListHeaderComponent={
          <AtlasListHeader
            currentPage={pagination.currentPage}
            onBack={redirectToFincas}
            selectedFarmName={selectedFarmName}
            showSeparator={!isPending && !isError && atlasItems.length > 0}
            totalCount={pagination.totalCount}
            totalPages={pagination.totalPages}
          />
        }
        renderItem={renderAtlasCard}
        showsVerticalScrollIndicator={false}
        windowSize={11}
      />
    </MainContainer>
  );
};

export default AtlasRoute;
