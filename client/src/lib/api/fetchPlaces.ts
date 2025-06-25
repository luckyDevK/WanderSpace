import axios from 'axios';

import type { IImage } from '@/types/ImageType';

interface IGetPlaces {
  places: IImage[];
  total: number;
  totalPages: number;
}

export const baseUrl = 'http://localhost:4000/place/';

export async function getPlaces(
  limit: number,
  page: number,
): Promise<IGetPlaces> {
  const { data } = await axios.get<IGetPlaces>(
    `${baseUrl}?limit=${limit}&page=${page}`,
  );

  return data;
}

export async function searchPlace(q: string): Promise<IImage[]> {
  const { data } = await axios.get<IImage[]>(
    `${baseUrl}search?q=${encodeURIComponent(q)}`,
  );

  return data;
}
