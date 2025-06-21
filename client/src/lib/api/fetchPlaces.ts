import axios from 'axios';

import type { IImage } from '@/types/ImageType';

export async function getPlaces(): Promise<IImage[]> {
  const res = await axios.get('http://localhost:5000/place/');

  console.log(res.data.places);
  return res.data.places;
}
