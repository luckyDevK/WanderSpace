export interface PlaceDialogProps {
  isEdit: boolean;
  initialValues?: {
    title: string;
    imageUrl: string;
    location: string;
    category: string;
    description: string;
  };
}
