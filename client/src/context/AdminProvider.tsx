import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import React, { useMemo } from 'react';

import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { AdminContext } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { getMyUser } from '@/lib/api/admin';
import type { IPlaceUser } from '@/types/ImageType';

interface AdminContextValue {
  totalUploads: number;
  mostRecentUpload: string;
  uploadedThisWeek: number;
  userPlaces: IPlaceUser[];
  isLoading: boolean;
}

export default function AdminProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const axiosPrivate = useAxiosPrivate();

  const { token } = useAuth() || {};
  const { data: userData, isLoading } = useQuery({
    queryKey: ['myPlace'],
    queryFn: ({ signal }) => getMyUser(axiosPrivate, signal),
    enabled: !!token,
  });

  const now = DateTime.now();
  const currentWeek = now.weekNumber;
  const currentWeekYear = now.weekYear;

  const userId = userData?.user._id;

  const places = useMemo(() => userData?.places ?? [], [userData?.places]);

  const totalUploads = places.filter(
    (place) => place.createdBy.userId === userId,
  ).length;

  const userCreatedAt = places.map((place) => place.createdAt);

  const isoStrings = userCreatedAt.map((d) =>
    typeof d === 'string' ? d : d.toISOString(),
  );

  const getMostRecentDate = (dateIsoStrings: string[]): string => {
    if (!dateIsoStrings.length) return 'N/A';
    const timeStamps = dateIsoStrings.map((d) => DateTime.fromISO(d));
    const mostRecent = timeStamps.reduce(
      (a, b) => (b > a ? b : a),
      timeStamps[0],
    );
    return mostRecent.toLocaleString(DateTime.DATETIME_SHORT);
  };

  const countInThisWeek = (dates: (string | Date)[]): number => {
    return dates.filter((ca) => {
      const date =
        typeof ca === 'string' ? DateTime.fromISO(ca) : DateTime.fromJSDate(ca);
      return (
        date.weekNumber === currentWeek && date.weekYear === currentWeekYear
      );
    }).length;
  };

  const mostRecentUpload = getMostRecentDate(isoStrings);
  const uploadedThisWeek = countInThisWeek(userCreatedAt);

  const ctxAdminValues: AdminContextValue = useMemo(
    () => ({
      totalUploads,
      mostRecentUpload,
      uploadedThisWeek,
      userPlaces: places,
      isLoading,
    }),
    [isLoading, places, totalUploads, mostRecentUpload, uploadedThisWeek],
  );

  return <AdminContext value={ctxAdminValues}>{children}</AdminContext>;
}
