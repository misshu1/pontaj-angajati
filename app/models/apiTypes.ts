export interface FreeDaysResponse {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  launchYear: number | null;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  types: string[];
}
