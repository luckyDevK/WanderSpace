import api from './axios';

import type { IImage } from '@/types/ImageType';

interface IGetPlaces {
  places: IImage[];
  total: number;
  totalPages: number;
}

export async function getPlaces(
  limit: number,
  page: number,
): Promise<IGetPlaces> {
  const { data } = await api.get(`/place?limit=${limit}&page=${page}`);

  return data;
}

export async function searchPlace(q: string): Promise<IImage[]> {
  const { data } = await api.get(`/place/search?q=${encodeURIComponent(q)}`);

  return data;
}
