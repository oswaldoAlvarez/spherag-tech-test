import { useQuery } from '@tanstack/react-query';

import { getFarms } from '../api/getFarms';
import type { Farm, FarmAccent, FarmApiItem } from '../types';

const accentByIndex: FarmAccent[] = ['green', 'blue', 'teal', 'amber'];

export const useFarms = () => {
  const farmsQuery = useQuery({
    queryKey: ['farms'],
    queryFn: getFarms,
  });

  return {
    ...farmsQuery,
    farms: (farmsQuery.data ?? []).map(mapFarm),
  };
};

const mapFarm = (farm: FarmApiItem, index: number): Farm => ({
  id: String(farm.id),
  name: farm.name,
  createdDateLabel: formatCreatedDate(farm.createdDate),
  isFavorite: farm.favourite,
  accent: accentByIndex[index % accentByIndex.length],
});

const formatCreatedDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);

  return `Creada el ${formatted}`;
};
