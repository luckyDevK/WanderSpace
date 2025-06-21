import { createContext, useContext, useState } from 'react';
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

function ss(params: type) {}

export default function PlaceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: places } = useQuery({
    queryKey: ['place'],
    queryFn: getPlaces,
  });

  const placesCtxValues = {
    places,
    isLoading: false,
  };

  return <PlaceContext value={placesCtxValues}>{children}</PlaceContext>;
}
