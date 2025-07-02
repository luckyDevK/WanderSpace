import type { LucideIcon } from 'lucide-react';
import type { NewPlaceType } from '@/components/admin/NewPlaceDialog';

export type ModalType = 'create' | 'edit' | 'delete' | '';

export interface PlaceDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleSubmit: (data: NewPlaceType, isValid: boolean) => void;
  isEdit: boolean;
  IconTrigger?: LucideIcon;
  initialValues?: NewPlaceType;
}

// const handleSubmitPlace = async (data: NewPlaceType) => {
//     if (isValid) {
//       const res = await axiosPrivate.post('/place/create', data);

//       console.log(res);

//       setIsOpen(false);
//       reset();
//     }
//   };
