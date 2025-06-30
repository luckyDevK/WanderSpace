import { useState } from 'react';

import type { NewPlaceType } from '@/components/admin/NewPlaceDialog';
import { ModalContext } from '@/hooks/useModal';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  function handleClose() {
    setOpen(false);
  }

  async function handleSubmitNewPlace(data: NewPlaceType, isValid: boolean) {
    console.log(isValid, 'BOOL');
    if (isValid) {
      await axiosPrivate.post('/place/create', data);

      handleClose();
    }
  }

  async function handleSubmitNewChanges(
    data: NewPlaceType,
    isValid: boolean,
    userId?: string,
  ) {
    if (isValid) {
      await axiosPrivate.post(`/place/create/${userId}`, data);

      handleClose();
    }
  }

  const ctxModalValues = {
    open,
    setOpen,
    handleClose,
    handleSubmitNewChanges,
    handleSubmitNewPlace,
  };

  return <ModalContext value={ctxModalValues}>{children}</ModalContext>;
}
