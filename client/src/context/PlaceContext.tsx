import { useQuery } from '@tanstack/react-query';

import { PlaceContext } from './usePlaceContext';
import { getPlaces, searchPlace } from '../lib/api/fetchPlaces';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function PlaceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams({ q: '' });

  const q = searchParams.get('q') || '';

  const { data: paginatedData, isLoading: isPaginatedLoading } = useQuery({
    queryKey: ['places', page],
    queryFn: () => getPlaces(limit, page),
  });

  const { data: searchedData, isPending: isSearchLoading } = useQuery({
    queryKey: ['searchPlaces', q],
    queryFn: () => searchPlace(q),
    enabled: q !== '',
  });

  useEffect(() => {
    console.log(searchedData);
  }, [searchedData]);

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
    setSearchParams((searchParams) => {
      searchParams.set('q', value);
      return searchParams;
    });
  }

  const placesCtxValues = {
    places,
    totalPages,
    isLoading,
    page,
    handleNavigate,
    handlePrevious,
    handleNext,
    handleSearch,
  };

  return <PlaceContext value={placesCtxValues}>{children}</PlaceContext>;
}
