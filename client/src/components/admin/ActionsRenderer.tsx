import { Pencil, Trash } from 'lucide-react';
import type { ICellRendererParams } from 'ag-grid-community';

import PlaceDialog from './NewPlaceDialog';

import { Button } from '../ui/button';
import { useAdmin } from '@/hooks/useAdmin';
import useModal from '@/hooks/useModal';

export default function ActionsRenderer(props: ICellRendererParams) {
  const defaultValues = props.value;

  const { open, setOpen, handleClose, handleSubmitNewChanges } = useModal();

  return (
    <div className="space-x-4 mt-4">
      <Button
        asChild
        className="bg-emerald-500 hover:bg-emerald-400 transition-colors duration-150 cursor-pointer"
      >
        <PlaceDialog
          IconTrigger={Pencil}
          isEdit={true}
          handleClose={handleClose}
          handleSubmit={handleSubmitNewChanges}
          isOpen={open}
          setIsOpen={setOpen}
          initialValues={defaultValues}
        />
      </Button>
      <Button
        onClick={() => setOpen(!open)}
        variant="destructive"
        className="cursor-pointer"
      >
        <Trash strokeWidth={3} />
      </Button>
    </div>
  );
}
