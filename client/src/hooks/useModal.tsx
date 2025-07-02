import type { IPlaceUser } from '@/types/ImageType';
import { createContext, useContext } from 'react';

import type { ModalType } from '@/types/PlaceDialogType';

type S = Omit<IPlaceUser, 'createdBy' | 'createdAt'>;

type PlaceType = Omit<S, '_id'> & Partial<Pick<S, '_id'>>;
export type IEditedPlace = PlaceType | null;

export interface IModalContext {
  open: ModalType;
  idPlaceToDelete: string | null;
  setIdPlaceToDelete: React.Dispatch<React.SetStateAction<string | null>>;
  editedPlace: IEditedPlace;
  setEditedPlace: React.Dispatch<IEditedPlace>;
  setOpen: React.Dispatch<React.SetStateAction<ModalType>>;
  handleClose: () => void;
  handleSubmitNewPlace: (data: PlaceType, isValid: boolean) => void;
  handleSubmitNewChanges: (data: PlaceType, isValid: boolean) => void;
  handleDeletePlace: () => void;
}

export const ModalContext = createContext<IModalContext | null>(null);

export default function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be within ModalProvider');
  }

  return context;
}
