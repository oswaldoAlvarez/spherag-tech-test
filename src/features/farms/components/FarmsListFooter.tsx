import { Platform } from 'react-native';

import { cn } from '../../../shared/lib/cn';
import { TextView } from '../../../shared/ui/atoms/TextView';

const FOOTER_HINT_CLASSNAME_BY_PLATFORM = Platform.select({
  android: 'self-center pb-1',
  default: 'self-center pb-6',
});

export const FarmsListFooter = () => (
  <TextView
    align="center"
    className={cn(FOOTER_HINT_CLASSNAME_BY_PLATFORM, 'mt-8')}
    tone="secondary"
    variant="label"
  >
    Selecciona una finca para ver sus Atlas.
  </TextView>
);
