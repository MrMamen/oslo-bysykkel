export type FeedTypes = "gbfs"|"system_information"|"station_information"|"station_status";//|"gbfs_versions"|"free_bike_status"|"system_hours"|"system_calendar"|"system_regions"|"system_pricing_plans"|"system_alerts";

export interface Output<T extends FeedTypes> {
  last_updated: number;
  ttl: number;
  version: string; //Required i følge spec, men mangler i faktisk data
  data: FeedMap[T];
}

export interface FeedMap  {
  gbfs: Gbfs,
  system_information: SystemInformation,
  station_information: StationInformation,
  station_status: StationStatus
}

export interface Gbfs {
  [langCode: string]: { feeds: Feed[] };
}

export interface Feed {
  name: FeedTypes;
  url: string;
}

export interface SystemInformation {
  system_id: string;
  language: string;
  name: string;
  short_name?: string;
  operator?: string;
  url?: string;
  purchase_url?: string;
  start_date?: string;
  phone_number?: string;
  email?: string;
  timezone: string;
  license_url?: string;
}

export interface StationInformation {
  stations: StationInfoData[];
}

export type RentalMethods =
  | "KEY"
  | "CREDITCARD"
  | "PAYPASS"
  | "APPLEPAY"
  | "ANDROIDPAY"
  | "TRANSITCARD"
  | "ACCOUNTNUMBER"
  | "PHONE";

export interface StationInfoData {
  station_id: string;
  name: string;
  short_name?: string;
  lat: number;
  lon: number;
  address?: string;
  cross_street?: string;
  region_id?: unknown;
  post_code?: string;
  rental_methods?: RentalMethods;
  capacity: number;
}

export interface StationStatus {
  stations: StationStatusData[];
}

export interface StationStatusData {
  station_id: string;
  num_bikes_available: number;
  num_bikes_disabled?: number;
  num_docks_available: number;
  num_docks_disabled?: number;
  is_installed: 0 | 1;
  is_renting: 0 | 1;
  is_returning: 0 | 1;
  last_reported: number;
}

