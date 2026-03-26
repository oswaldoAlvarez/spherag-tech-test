import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AtlasDetailErrorState } from '../../../../features/atlas/components/AtlasDetailErrorState';
import { AtlasDetailLoadingState } from '../../../../features/atlas/components/AtlasDetailLoadingState';
import { AtlasDetailMapCard } from '../../../../features/atlas/components/AtlasDetailMapCard';
import { AtlasDetailSummary } from '../../../../features/atlas/components/AtlasDetailSummary';
import { useAtlasDetail } from '../../../../features/atlas/hooks/useAtlasDetail';
import { routes } from '../../../../shared/config/routes';
import { MainContainer } from '../../../../shared/ui/templates/MainContainer';

const DEFAULT_ATLAS_DETAIL_ERROR_MESSAGE =
  'No pudimos cargar el detalle del Atlas.';
const DEFAULT_FARM_NAME = 'esta finca';

const AtlasDetailRoute = () => {
  const router = useRouter();
  const { farmName, id, imei } = useLocalSearchParams<{
    farmName?: string;
    id: string;
    imei: string;
  }>();
  const [isRetrying, setIsRetrying] = useState(false);

  const { atlasDetail, error, isError, isPending, refetch } = useAtlasDetail({
    id,
    imei,
  });

  const selectedFarmName =
    typeof farmName === 'string' ? farmName : DEFAULT_FARM_NAME;

  const atlasDetailErrorMessage =
    error instanceof Error ? error.message : DEFAULT_ATLAS_DETAIL_ERROR_MESSAGE;

  const redirectToAtlas = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(routes.atlas(id, selectedFarmName));
  };

  const handleRetry = async () => {
    setIsRetrying(true);

    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <MainContainer className="pb-10 pt-0" dismissKeyboardOnPress={false} scroll>
      {isPending ? <AtlasDetailLoadingState /> : null}

      {isError ? (
        <View className="pt-4">
          <AtlasDetailErrorState
            isRetrying={isRetrying}
            message={atlasDetailErrorMessage}
            onRetry={handleRetry}
          />
        </View>
      ) : null}

      {!isPending && !isError && atlasDetail ? (
        <>
          <AtlasDetailSummary
            atlas={atlasDetail}
            farmName={selectedFarmName}
            onBack={redirectToAtlas}
          />

          <AtlasDetailMapCard
            latitude={atlasDetail.latitude}
            longitude={atlasDetail.longitude}
            title={atlasDetail.name}
          />
        </>
      ) : null}
    </MainContainer>
  );
};

export default AtlasDetailRoute;
