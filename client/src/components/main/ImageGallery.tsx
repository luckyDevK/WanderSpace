import { usePlace } from '@/context/PlaceContext';

import { DialogGallery } from './gallery-dialog/DialogGallery';
import ImageContent from './ImageContent';
import Spinner from '../customized/spinner/spinner-08';

export default function ImageGallery() {
  const { places, isLoading } = usePlace();

  if (isLoading) {
    return (
      <div className=" h-[60vh] col-span-3 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {places.map((place) => (
        <DialogGallery key={place.id} place={place}>
          <ImageContent imageUrl={place.imageUrl} title={place.title} />
        </DialogGallery>
      ))}
    </>
  );
}
