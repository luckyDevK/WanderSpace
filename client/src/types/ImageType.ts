import type { CategoryType } from '@/lib/categories';

export interface IImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  category: CategoryType;
  createdBy: string;
  createdAt: Date;
}
