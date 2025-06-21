import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { IImage } from '@/types/ImageType';
import { getPlaces } from '../lib/api/fetchPlaces';

interface PlaceContextType {
  places: IImage[];
  isLoading: boolean;
}

const PlaceContext = createContext<PlaceContextType | null>(null);

export const usePlace = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error('usePlace must be used within PlaceContextProvider');
  }
  return context;
};

export default function PlaceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: places = [], isLoading } = useQuery({
    queryKey: ['place'],
    queryFn: getPlaces,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log(places);

  const placesCtxValues = {
    places,
    isLoading,
  };

  return <PlaceContext value={placesCtxValues}>{children}</PlaceContext>;
}
