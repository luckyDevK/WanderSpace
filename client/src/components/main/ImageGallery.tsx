import { usePlace } from '@/context/PlaceContext';

import { DialogGallery } from './gallery-dialog/DialogGallery';

export default function ImageGallery() {
  const { places } = usePlace();

  return (
    <>
      {places.map((place) => {
        <DialogGallery key={place.id} place={place}>
          <div className="relative overflow-hidden rounded-xl group transition-shadow duration-300 hover:shadow-md cursor-zoom-in">
            <img
              src={place.imageUrl}
              alt={place.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between px-4 pb-3 text-white">
              <span className="text-sm font-semibold">{place.title}</span>
              <button className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm cursor-pointer">
                Download
              </button>
            </div>
          </div>
        </DialogGallery>;
      })}
    </>
  );
}
