import { createContext, useContext } from 'react';
import type { IImage } from '@/types/ImageType';

interface PlaceContextType {
  places: IImage[];
  handleSearch: (value: string) => void;
  totalPages: number;
  isLoading: boolean;
  page: number;
  handleNavigate: (page: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export const PlaceContext = createContext<PlaceContextType | null>(null);

export const usePlacesContext = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error('usePlacesContext must be used within a PlaceProvider');
  }
  return context;
};
