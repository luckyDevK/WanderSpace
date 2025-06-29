import { useEffect } from 'react';
import { getMyUser } from '@/lib/api/admin';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { AdminContext } from '@/hooks/useAdmin';
import { getMostRecentDate } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function AdminContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['myPlace'],
    queryFn: ({ signal }) => getMyUser(signal),
    enabled: !!token,
  });

  const userId = userData.user.id;

  const totalUploads = userData.places.filter(
    (place) => place.createdBy.userId === userId,
  ).length;

  const isoStrings = userData.places
    .map((p) =>
      typeof p.createdAt === 'string'
        ? p.createdAt
        : p.createdAt?.toISOString?.(),
    )
    .filter((d): d is string => Boolean(d));

  const mostRecentUpload = getMostRecentDate(isoStrings);

  const uploadedThisWeek = isoStrings.filter((iso) => {
    const date = new Date(iso);
    const now = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - now.getDay());
    return date >= startOfWeek;
  }).length;

  const ctxAdminValues = {
    userPlace: userData.places,
    isLoading,
    totalUploads,
    mostRecentUpload,
    uploadedThisWeek,
  };

  return (
    <AdminContext.Provider value={ctxAdminValues}>
      {children}
    </AdminContext.Provider>
  );
}
