import { usePlacesContext } from '@/context/usePlaceContext';

import { DialogGallery } from './gallery-dialog/DialogGallery';
import ImageWrapper from './ImageWrapper';
import Spinner from '../customized/spinner/spinner-08';

import PaginationTabs from './Pagination';

export default function ImageGallery() {
  const { places, isLoading } = usePlacesContext();

  if (isLoading) {
    return (
      <div className=" h-[60vh] col-span-3 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-muted-foreground text-xl">
        <p>No places found.</p>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {places.map((place) => (
          <ImageWrapper
            key={place._id}
            imageUrl={place.imageUrl}
            title={place.title}
          >
            <DialogGallery place={place}>
              <img
                src={place.imageUrl}
                alt={place.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </DialogGallery>
          </ImageWrapper>
        ))}
      </section>
      <PaginationTabs />
    </>
  );
}
