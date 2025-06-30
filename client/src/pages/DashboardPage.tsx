import { useAuth } from '@/hooks/useAuth';
import Dashboard from '@/components/admin/Dashboard';
import NotUpload from '@/components/admin/NotUpload';
import TableAdmin from '@/components/admin/TableDashboard';

export default function DashboardPage() {
  return (
    <section className="mt-16 px-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Hi, <span className="capitalize">Wpo</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your WanderSpace dashboard ✨
        </p>
      </header>
      <Dashboard />
      <TableAdmin />
    </section>
  );
}
