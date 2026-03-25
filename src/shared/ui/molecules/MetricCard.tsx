import { TextView } from '../atoms/TextView';
import { SurfaceCard } from './SurfaceCard';

type MetricCardProps = {
  label: string;
  value: string;
};

export const MetricCard = ({ label, value }: MetricCardProps) => (
  <SurfaceCard className="flex-1 rounded-[18px] bg-surface-700 px-3 py-3">
    <TextView tone="secondary" variant="caption">
      {label}
    </TextView>
    <TextView className="mt-2" variant="button">
      {value}
    </TextView>
  </SurfaceCard>
);
