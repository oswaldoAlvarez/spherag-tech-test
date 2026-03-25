import { View } from 'react-native';

type ListItemSeparatorProps = {
  height?: number;
};

export const ListItemSeparator = ({ height = 16 }: ListItemSeparatorProps) => (
  <View style={{ height }} />
);
