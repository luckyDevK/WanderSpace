import type { NewPlaceType } from '@/components/admin/NewPlaceDialog';
import { createContext, useContext } from 'react';

// const [open, setOpen] = useState(false);
// const axiosPrivate = useAxiosPrivate();

// if (isLoading) {
//   return <Spinner />;
// }

// function handleClose() {
//   setOpen(false);
// }

// async function handleSubmit(
//   data: NewPlaceType,
//   isValid: boolean,
//   isSubmitSuccessful: boolean,
// ) {
//   if (isValid && isSubmitSuccessful) {
//     await axiosPrivate.post('/place/create', data);

//     setOpen(false);
//   }
// }

export interface IModalContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  handleSubmitNewPlace: (data: NewPlaceType, isValid: boolean) => void;

  handleSubmitNewChanges: (
    data: NewPlaceType,
    isValid: boolean,
    userId?: string,
  ) => void;
}

export const ModalContext = createContext<IModalContext | null>(null);

export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be within ModalProvider');
  }

  return context;
}
