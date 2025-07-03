import { usePlacesContext } from '@/hooks/usePlaceContext';

import { DialogGallery } from './gallery-dialog/DialogGallery';

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
          <DialogGallery
            key={place._id}
            title={place.title}
            imageUrl={place.imageUrl}
            location={place.location}
            description={place.description}
            category={place.category}
            createdBy={place.createdBy}
          />
        ))}
      </section>
      <PaginationTabs />
    </>
  );
}
