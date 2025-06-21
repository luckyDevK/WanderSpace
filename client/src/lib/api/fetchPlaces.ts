import axios from 'axios';

import type { IImage } from '@/types/ImageType';

interface IGetPlaces {
  places: IImage[];
  total: number;
  totalPages: number;
}

const baseUrl = 'http://localhost:4000/place/';

export async function getPlaces(
  limit: number,
  page: number,
): Promise<IGetPlaces> {
  const res = await axios.get(baseUrl + `?limit=${limit}&page=${page}`);

  const places = res.data.places;
  const total = res.data.total;
  const totalPages = res.data.totalPages;

  return { places, total, totalPages };
}

export async function searchPlace(q: string): Promise<IImage[]> {
  const res = await axios.get(baseUrl + `search?q=${encodeURIComponent(q)}`);

  return res.data;
}
