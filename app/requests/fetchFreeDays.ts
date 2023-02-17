import type { FreeDaysResponse } from '~/models/apiTypes';

export const fetchFreeDays = async (year: number) => {
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
