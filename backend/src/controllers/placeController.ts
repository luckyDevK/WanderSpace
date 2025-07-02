import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

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
import User from '../models/user';

export const getPlaces = async (
  req: Request<{}, {}, {}, { page: number; limit: number }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const total = await Place.countDocuments();

  const updatedPlaces = await Place.find()
    .select('-__v  -updatedAt')
    .populate('createdBy', 'username')
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    message: 'success',
    places: updatedPlaces,
    total,
    limit,
    totalPages: Math.ceil(total / limit),
  });
  return;
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

  const populatedPlace = await Place.findById(place._id).select(
    '-__v -updatedAt',
  );

  console.log(populatedPlace, 'wwww');

  return res
    .status(201)
    .json({ message: 'success', place: populatedPlace, success: true });
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const updates = matchedData(req) as UpdatePlaceInput;

  const id = decodeURIComponent(req.params.id);
  console.log(id, 'updated id');

  const updated = await Place.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('-__v -updatedAt');

  if (!updated) {
    res.status(404).json({ message: 'Place not found', success: false });
    return;
  }

  res.status(200).json({
    message: 'success',
    place: updated,
    success: true,
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
    res.status(404).json({ message: 'Place not found', success: false });
    return;
  }

  res.status(200).json({
    message: 'Place deleted successfully',
    success: true,
    place: deleted,
  });
  return;
};

export const searchPlaces = async (
  req: Request<{}, {}, {}, { q?: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const query = decodeURIComponent(req.query.q?.trim() as string);

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
