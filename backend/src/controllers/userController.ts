import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Place from '../models/place'; // adjust the path as needed

export const getCurrentUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;
    console.log(userId, 'id');

    const user = await User.findById(userId).select('-password -__v -email');

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const userPlaces = await Place.find({ createdBy: userId }).select('-__v');

    res.status(200).json({ success: true, user, places: userPlaces });
  } catch (err) {
    next(err);
  }
};
