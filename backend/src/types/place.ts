import { Document, Types } from 'mongoose';
import { categories } from '../utils/category';

export interface IPlace {
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  category: (typeof categories)[number];
  createdBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreatePlaceInput = Omit<IPlace, '_id' | 'createdBy'>;

export type UpdatePlaceInput = Partial<Omit<IPlace, '_id' | 'createdBy'>>;

export type DeletePlaceInput = string | Types.ObjectId;

export type IDocumentPlace = IPlace & Document;
