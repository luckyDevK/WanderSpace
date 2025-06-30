import type { AxiosInstance } from 'axios';
import type { IPlaceUser } from '@/types/ImageType';

interface IUser {
  _id: string;
  username: string;
}

interface IDataUser {
  message: string;
  user: IUser;
  places: IPlaceUser[];
}

export async function getMyUser(
  axiosPrivate: AxiosInstance,
  signal: AbortSignal,
) {
  const { data } = await axiosPrivate.get<IDataUser>('/users/me', { signal });

  return data;
}
