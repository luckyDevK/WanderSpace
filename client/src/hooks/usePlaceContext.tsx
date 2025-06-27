import { createContext, useContext } from 'react';
import type { IImage } from '@/types/ImageType';

export interface PlaceContextType {
  places: IImage[];
  totalPages: number;
  isLoading: boolean;
  page: number;
  handleNavigate: (page: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleSearch: (value: string) => void;
}

export const PlaceContext = createContext<PlaceContextType | null>(null);

export const usePlacesContext = () => {
  const context = useContext(PlaceContext);

  if (!context) {
    throw new Error('usePlacesContext must be used within a PlaceProvider');
  }

  return context;
};
