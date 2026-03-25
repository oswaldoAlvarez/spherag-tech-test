import { View } from 'react-native';

import { TextView } from '../../../shared/ui/atoms/TextView';
import { AtlasPagination } from './AtlasPagination';

type AtlasListFooterProps = {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  totalPages: number;
};

export const AtlasListFooter = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  totalPages,
}: AtlasListFooterProps) => (
  <View>
    <AtlasPagination
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      totalPages={totalPages}
    />

    <TextView
      align="center"
      className="mt-8 self-center pb-4"
      tone="secondary"
      variant="label"
    >
      Selecciona un Atlas para ver su detalle.
    </TextView>
  </View>
);
