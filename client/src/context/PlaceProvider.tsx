import { useQuery } from '@tanstack/react-query';
import { useRef, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PlaceContext } from './usePlaceContext';
import { getPlaces, searchPlace } from '../lib/api/fetchPlaces';

export default function PlaceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams({ q: '' });

  const q = searchParams.get('q') || '';
  const lastChange = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: paginatedData, isLoading: isPaginatedLoading } = useQuery({
    queryKey: ['places', page],
    queryFn: () => getPlaces(limit, page),
    enabled: q === '',
  });

  const { data: searchedData, isPending: isSearchLoading } = useQuery({
    queryKey: ['searchPlaces', q],
    queryFn: () => searchPlace(q),
    enabled: q !== '',
  });

  const limit = 12;
  const places = q ? searchedData || [] : paginatedData?.places || [];

  const isLoading = q ? isSearchLoading : isPaginatedLoading;
  const totalPages = paginatedData?.totalPages ?? 0;

  function handleNavigate(page: number) {
    setPage(page);
  }

  function handlePrevious() {
    if (page === 1) {
      setPage(totalPages);
    } else {
      setPage((page) => page - 1);
    }
  }

  function handleNext() {
    if (page === totalPages) {
      setPage(1);
    } else {
      setPage((page) => page + 1);
    }
  }

  function handleSearch(value: string) {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchParams((searchParams) => {
        searchParams.set('q', value);
        return searchParams;
      });
    }, 500);
  }

  const placesCtxValues = useMemo(
    () => ({
      places,
      totalPages,
      isLoading,
      page,
      handleNavigate,
      handlePrevious,
      handleNext,
      handleSearch,
    }),
    [places, totalPages, isLoading, page],
  );

  return <PlaceContext value={placesCtxValues}>{children}</PlaceContext>;
}
