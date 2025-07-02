import { Pencil, Trash } from 'lucide-react';
import type { ICellRendererParams } from 'ag-grid-community';

import type { IEditedPlace } from '@/hooks/useModal';
import { Button } from '../ui/button';
import useModal from '@/hooks/useModal';

export default function ActionsRenderer(props: ICellRendererParams) {
  const rowData: IEditedPlace = props.data;

  const { setEditedPlace, setOpen, setIdPlaceToDelete } = useModal();

  return (
    <div className="space-x-4 mt-4">
      <Button
        onClick={() => {
          console.log(rowData);
          setOpen('edit');
          setEditedPlace(rowData);
        }}
        className="bg-emerald-500 hover:bg-emerald-400 transition-colors duration-150 cursor-pointer"
      >
        <Pencil strokeWidth={3} />
      </Button>
      <Button
        onClick={() => {
          if (rowData?._id) {
            setIdPlaceToDelete(rowData?._id);
          }
          setOpen('delete');
        }}
        variant="destructive"
        className="cursor-pointer"
      >
        <Trash strokeWidth={3} />
      </Button>
    </div>
  );
}
