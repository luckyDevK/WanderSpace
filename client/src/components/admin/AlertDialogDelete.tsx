import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import useModal from '@/hooks/useModal';

interface IAlertDialogDeleteProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertTitle: string;
  alertDesc: string;
}

export default function AlertDialogDelete({
  isOpen,
  setIsOpen,
  alertDesc,
  alertTitle,
}: IAlertDialogDeleteProps) {
  const { handleClose, handleDeletePlace } = useModal();

  return (
    <AlertDialog open={isOpen} onOpenChange={(val) => setIsOpen(val)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDesc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={handleClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 transition-colors duration-300 cursor-pointer"
            onClick={handleDeletePlace}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
