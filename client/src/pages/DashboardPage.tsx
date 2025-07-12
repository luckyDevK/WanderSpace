import Dashboard from '@/components/admin/Dashboard';
import NotUpload from '@/components/admin/NotUpload';
import TableAdmin from '@/components/admin/TableDashboard';
import { useAdmin } from '@/hooks/useAdmin';
import Spinner from '@/components/customized/spinner/spinner-08';

export default function DashboardPage() {
  const { userData, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className=" h-[60vh] col-span-3 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="mt-16 px-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Hi, <span className="capitalize">{userData?.user.username}</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your WanderSpace dashboard ✨
        </p>
      </header>
      {userData?.places.length === 0 ? <NotUpload /> : <Dashboard />}
      {userData?.places && userData.places.length > 0 && <TableAdmin />}
    </section>
  );
}
