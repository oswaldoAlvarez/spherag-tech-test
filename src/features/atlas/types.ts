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
