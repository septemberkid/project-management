'use client';
import { useQueryStates, parseAsInteger } from 'nuqs';

export const useQueriesTable = () => {
  return useQueryStates({
    pageIndex: parseAsInteger.withDefault(0).withOptions({
      clearOnDefault: true,
    }),
    pageSize: parseAsInteger.withDefault(10).withOptions({
      clearOnDefault: true,
    }),
  });
};
