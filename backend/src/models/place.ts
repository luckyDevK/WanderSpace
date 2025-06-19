import { Schema, model } from 'mongoose';

import { categories } from '../utils/category';
import { IDocumentPlace } from '../types/place';

const placeSchema = new Schema<IDocumentPlace>(
  {
    title: { type: String, required: true, trim: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10, trim: true },
    imageUrl: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true, enum: [...categories] },
    createdBy: { type: Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const Place = model<IDocumentPlace>('Place', placeSchema);

export default Place;
