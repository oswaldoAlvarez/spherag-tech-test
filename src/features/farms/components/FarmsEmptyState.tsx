import { FeedbackCard } from '../../../shared/ui/molecules/FeedbackCard';

type FarmsFilter = 'favorites' | 'all';

type FarmsEmptyStateProps = {
  activeFilter: FarmsFilter;
};

export const FarmsEmptyState = ({ activeFilter }: FarmsEmptyStateProps) => (
  <FeedbackCard
    message={
      activeFilter === 'favorites'
        ? 'Prueba cambiando a la vista de todas para revisar el resto del listado.'
        : 'Cuando haya sistemas disponibles, se mostrarán aquí.'
    }
    title={
      activeFilter === 'favorites'
        ? 'No hay favoritas por mostrar'
        : 'No hay fincas disponibles'
    }
  />
);
