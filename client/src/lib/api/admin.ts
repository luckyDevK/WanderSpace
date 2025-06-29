import { axiosPrivate } from './axios';
import type { IPlaceUser } from '@/types/ImageType';

interface IUser {
  id: string;
  username: string;
}

interface IDataUser {
  message: string;
  user: IUser;
  places: IPlaceUser[];
}

export async function getMyUser(signal: AbortSignal) {
  const { data } = await axiosPrivate.get<IDataUser>('/users/me', {
    signal,
  });

  if (!data.message) {
    alert('s');
  }

  console.log(data, 'wlsl');

  return data;
}
