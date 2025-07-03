import { useState } from 'react';

import type { NewPlaceType } from '@/components/admin/NewPlaceDialog';
import { ModalContext } from '@/hooks/useModal';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

import type { ModalType } from '@/types/PlaceDialogType';
import type { IPlaceUser } from '@/types/ImageType';
import type { IEditedPlace } from '@/hooks/useModal';
import { useOptimisticMutation } from '@/hooks/useOptimisticMutation';
import { handleRequest } from '@/lib/utils';

interface IResPlace {
  message: string;
  place: IPlaceUser;
  success: boolean;
}

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<ModalType>('');
  const [editedPlace, setEditedPlace] = useState<IEditedPlace>(null);
  const [idPlaceToDelete, setIdPlaceToDelete] = useState<string | null>(null);

  const axiosPrivate = useAxiosPrivate();

  function handleClose() {
    setOpen('');
  }

  async function createPlace(data: NewPlaceType) {
    return handleRequest<IResPlace['place']>(() =>
      axiosPrivate.post('/place/create', data),
    );
  }

  async function updatePlace(data: NewPlaceType) {
    return handleRequest<IResPlace['place']>(() =>
      axiosPrivate.patch(`/place/update/${editedPlace?._id}`, data),
    );
  }

  async function deletePlace(id: string) {
    return handleRequest<IResPlace['place']>(() =>
      axiosPrivate.delete(`/place/delete/${id}`),
    );
  }

  const mutationCreatePlace = useOptimisticMutation<IPlaceUser, NewPlaceType>({
    mutationFn: createPlace,
    updateFn: (old, _input, result) => [...old, result],
    onDone: handleClose,
  });

  const mutationUpdatePlace = useOptimisticMutation<IPlaceUser, NewPlaceType>({
    mutationFn: updatePlace,
    updateFn: (old, _input, result) =>
      old.map((o) => (o._id === result._id ? result : o)),
    onDone: () => {
      handleClose();
      setEditedPlace(null);
    },
  });

  const mutationDeletePlace = useOptimisticMutation<IPlaceUser, string>({
    mutationFn: deletePlace,
    updateFn: (old, idToDelete) => old.filter((o) => o._id !== idToDelete),
    onDone: () => {
      handleClose();
      setIdPlaceToDelete(null);
    },
  });

  function handleSubmitNewPlace(data: NewPlaceType, isValid: boolean) {
    if (isValid) {
      mutationCreatePlace.mutate(data);
    }
  }

  async function handleSubmitNewChanges(data: NewPlaceType, isValid: boolean) {
    if (isValid && editedPlace) {
      mutationUpdatePlace.mutate(data);
    }
  }

  async function handleDeletePlace() {
    if (idPlaceToDelete) {
      mutationDeletePlace.mutate(idPlaceToDelete);
    }
  }

  const ctxModalValues = {
    open,
    idPlaceToDelete,
    setIdPlaceToDelete,
    editedPlace,
    setEditedPlace,
    setOpen,
    handleClose,
    handleSubmitNewChanges,
    handleSubmitNewPlace,
    handleDeletePlace,
  };

  return <ModalContext value={ctxModalValues}>{children}</ModalContext>;
}
