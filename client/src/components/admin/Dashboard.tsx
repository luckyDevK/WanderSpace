import { Clock, UploadCloud, CalendarDays, Plus } from 'lucide-react';

import { Button } from '../ui/button';
import Spinner from '../customized/spinner/spinner-08';
import PlaceDialog from './NewPlaceDialog';
import { useAdmin } from '@/hooks/useAdmin';
import useModal from '@/hooks/useModal';
import AlertDialogDelete from './AlertDialogDelete';

function StatCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <Icon className="w-10 h-10 text-primary" />
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-xl font-medium text-muted-foreground">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const { totalUploads, mostRecentUpload, uploadedThisWeek, isLoading } =
    useAdmin();

  const {
    handleSubmitNewPlace,
    handleSubmitNewChanges,
    handleClose,
    setOpen,
    open,
    editedPlace,
  } = useModal();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="max-w-4xl w-full  px-4 py-8 border-2 border-slate-800 rounded-xl">
        <div className="flex justify-around items-center gap-5 flex-wrap">
          <StatCard
            icon={UploadCloud}
            title="Total Uploads"
            value={totalUploads}
          />
          <StatCard
            icon={Clock}
            title="Most Recent Upload"
            value={mostRecentUpload}
          />
          <StatCard
            icon={CalendarDays}
            title="Uploaded This Week"
            value={uploadedThisWeek}
          />
        </div>
      </section>
      <Button
        className="mt-5 cursor-pointer border-2 border-slate-700"
        variant="outline"
        onClick={() => setOpen('create')}
      >
        <Plus strokeWidth={3} /> Add New Place
      </Button>

      <PlaceDialog
        isEdit={false}
        isOpen={open === 'create'}
        setIsOpen={(val) => setOpen(val ? 'create' : '')}
        handleClose={handleClose}
        handleSubmit={handleSubmitNewPlace}
      />

      <PlaceDialog
        isEdit={true}
        isOpen={open === 'edit'}
        setIsOpen={(val) => setOpen(val ? 'edit' : '')}
        handleClose={handleClose}
        handleSubmit={handleSubmitNewChanges}
        initialValues={editedPlace ?? undefined}
      />

      <AlertDialogDelete
        isOpen={open === 'delete'}
        setIsOpen={(val) => setOpen(val ? 'delete' : '')}
        alertTitle="Are you absolutely sure?"
        alertDesc="This action cannot be undone. This will permanently delete the selected place."
      />
    </>
  );
}
