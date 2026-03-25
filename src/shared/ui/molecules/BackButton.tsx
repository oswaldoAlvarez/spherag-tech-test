import { Button } from './Button';

type BackButtonProps = {
  label?: string;
  onPress: () => void;
};

export const BackButton = ({ label = 'Volver', onPress }: BackButtonProps) => (
  <Button
    className="min-h-0 self-start py-3"
    label={label}
    onPress={onPress}
    variant="transparent"
  />
);
