import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { Document } from 'mongoose';
import { decode } from 'jsonwebtoken';

import {
  CreatePlaceInput,
  DeletePlaceInput,
  IPlace,
  UpdatePlaceInput,
} from '../types/place';
import { seedDefaultUser } from '../seed/defaultUser';
import { seedBeautifulPlaces } from '../seed/seedBeautifulPlaces';
import Place from '../models/place';
import { AuthRequest } from '../types/auth';

export const getPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const places = await Place.find();

  if (places.length === 0) {
    const userId = await seedDefaultUser();
    await seedBeautifulPlaces(userId);
  }

  const updatedPlaces = await Place.find().select('-__v  -updatedAt');

  return res.status(200).json({
    message: 'success',
    place: updatedPlaces,
  });
};

export const createPlace = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { title, description, imageUrl, location, category } = matchedData(
    req,
  ) as CreatePlaceInput;

  const place = await Place.create({
    title,
    description,
    imageUrl,
    location,
    category,
    createdBy: req.userId,
  });

  const { __v, updatedAt, ...newPlace } = place.toObject();

  return res.status(201).json({ message: 'success', place: newPlace });
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const updates = matchedData(req) as UpdatePlaceInput;

  console.log(req.params.id);
  const id = decodeURIComponent(req.params.id);

  const updated = await Place.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('-__v -updatedAt');

  if (!updated) {
    res.status(404).json({ message: 'Place not found' });
    return;
  }

  res.status(200).json({
    message: 'success',
    place: updated,
  });
  return;
};

export const deletePlace = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const placeId = decodeURIComponent(req.params.id);

  const deleted = await Place.findByIdAndDelete(placeId);

  if (!deleted) {
    res.status(404).json({ message: 'Place not found' });
    return;
  }

  res.status(200).json({ message: 'Place deleted successfully' });
  return;
};

export const searchPlaces = async (
  req: Request<{}, {}, {}, { q?: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = req.query.q?.trim() || '';

  const results = await Place.find({
    $or: [
      { title: new RegExp(query, 'i') },
      { description: new RegExp(query, 'i') },
      { location: new RegExp(query, 'i') },
      { category: new RegExp(query, 'i') },
    ],
  }).select('-__v -updatedAt');

  res.json(results);
  return;
};
