import { useMatches } from '@remix-run/react';
import type { RootData } from '~/models';

export const useRootData = () => {
  const data = useMatches().find((match) => !!match.data)?.data ?? null;

  return data as RootData | null;
};
