export type AtlasApiItem = {
  id: number;
  imei: string;
  name: string;
  isAtlasTwo: boolean;
  status: number;
  batteryPercentage: number;
  signalPercentage: number;
  expiredDate: string;
  mainProductType: number;
};

export type AtlasApiResponse = {
  items: AtlasApiItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type AtlasDevice = {
  id: string;
  imei: string;
  name: string;
  batteryPercentage: number;
  signalPercentage: number;
  expiredDateLabel: string;
};

export type AtlasDetailApiResponse = {
  imei: string;
  name: string;
  type: number;
  productTypeName: string;
  systemId: number;
  latitude: string;
  longitude: string;
  batteryPercentage: number;
  signalPercentage: number;
  expiredDate: string;
  atlasStatus: number;
  energyMode: number;
  connectors: Record<string, unknown>;
};

export type AtlasDetail = {
  batteryPercentage: number;
  expiredDateLabel: string;
  imei: string;
  latitude: number | null;
  longitude: number | null;
  name: string;
  productTypeName: string;
  signalPercentage: number;
};
