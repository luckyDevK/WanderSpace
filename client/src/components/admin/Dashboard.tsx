import { Clock, UploadCloud, CalendarDays } from 'lucide-react';
import { useState } from 'react';

import Spinner from '../customized/spinner/spinner-08';
import PlaceDialog from './NewPlaceDialog';
import { useAdmin } from '@/hooks/useAdmin';
import useModal from '@/hooks/useModal';

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

  const { handleSubmitNewPlace, handleClose, open, setOpen } = useModal();

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
      <PlaceDialog
        isEdit={false}
        isOpen={open}
        setIsOpen={setOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmitNewPlace}
      />
    </>
  );
}
