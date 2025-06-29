import api from './axios';

import type { IPlaceUser } from '@/types/ImageType';

interface IGetPlaces {
  places: IPlaceUser[];
  total: number;
  totalPages: number;
}

export async function getPlaces(
  limit: number,
  page: number,
  signal: AbortSignal,
): Promise<IGetPlaces> {
  const { data } = await api.get(`/place?limit=${limit}&page=${page}`, {
    signal,
  });

  return data;
}

export async function searchPlace(
  q: string,
  signal: AbortSignal,
): Promise<IPlaceUser[]> {
  const { data } = await api.get(`/place/search?q=${encodeURIComponent(q)}`, {
    signal,
  });

  return data;
}
