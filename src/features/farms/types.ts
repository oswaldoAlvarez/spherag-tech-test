export type FarmAccent = 'green' | 'blue' | 'amber' | 'teal';

export type FarmApiItem = {
  id: number;
  name: string;
  favourite: boolean;
  createdDate: string;
};

export type Farm = {
  id: string;
  name: string;
  createdDateLabel: string;
  isFavorite: boolean;
  accent: FarmAccent;
};
