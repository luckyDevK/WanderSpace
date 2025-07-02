import { FileX } from 'lucide-react';

import PlaceDialog from './NewPlaceDialog';
import Spinner from '../customized/spinner/spinner-08';
import { Button } from '../ui/button';
import { useAdmin } from '@/hooks/useAdmin';

import useModal from '@/hooks/useModal';

export default function NotUpload() {
  const { userPlace, isLoading } = useAdmin();
  const { open, setOpen, handleClose, handleSubmitNewPlace } = useModal();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-4xl w-full  px-6 py-10 border-2 border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center md:items-start gap-3">
        <FileX className="w-10 h-10 text-primary" />
        <h3 className="text-xl font-semibold">No place yet</h3>
        <p className="text-muted-foreground text-center md:text-left">
          You haven’t uploaded any content yet. Start by adding your first
          place!
        </p>
      </div>
      <Button
        onClick={() => setOpen('create')}
        className="md:mr-8 cursor-pointer"
      >
        Add New Files
      </Button>

      <PlaceDialog
        isOpen={open === 'create'}
        setIsOpen={(val) => setOpen(val ? 'create' : '')}
        isEdit={false}
        handleClose={handleClose}
        handleSubmit={handleSubmitNewPlace}
      />
    </div>
  );
}
