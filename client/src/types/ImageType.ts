import type { CategoryType } from '@/lib/categories';

export interface IImage {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  category: CategoryType;
  createdBy: {
    userId: string;
    username: string;
  };
  createdAt: Date;
}

type NumAndActionsType = { no: number; actions?: React.JSX.Element };

export type RowData = NumAndActionsType & Omit<IImage, '_id' | 'createdBy'>;
