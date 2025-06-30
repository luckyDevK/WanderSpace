import type { IPlaceUser } from '@/types/ImageType';
import { createContext, useContext } from 'react';

interface IAdminContext {
  totalUploads: number;
  mostRecentUpload: string;
  uploadedThisWeek: number;
  userPlaces: IPlaceUser[];
  isLoading: boolean;
}

export const AdminContext = createContext<IAdminContext | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error('useAdmin must be within AdminProvider');
  }

  return context;
};
