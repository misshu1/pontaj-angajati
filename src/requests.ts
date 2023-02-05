interface FreeDaysResponse {
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

export const fetchFreeDays = async (
  year: number
): Promise<FreeDaysResponse[]> => {
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/RO`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response: FreeDaysResponse[] = await res.json();

  return response;
};
