import type { CategoryType } from '@/lib/categories';

export interface IPlaceUser {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  category: CategoryType;
  createdBy: {
    _id: string;
    username: string;
  };
  createdAt: Date;
}

type NumAndActionsType = { no: number; actions?: React.JSX.Element };

export type RowData = NumAndActionsType & Omit<IPlaceUser, '_id' | 'createdBy'>;
