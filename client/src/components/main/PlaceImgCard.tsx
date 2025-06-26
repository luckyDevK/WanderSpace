import ImageWrapper from './ImageWrapper';
import { DialogGallery } from './gallery-dialog/DialogGallery';

interface ImgCardProps {
  id: string;
  imageUrl: string;
  title: string;
  place;
}

export default function PlaceImgCard() {
  return (
    <ImageWrapper key={place._id} imageUrl={place.imageUrl} title={place.title}>
      <DialogGallery place={place}>
        <img
          src={place.imageUrl}
          alt={place.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </DialogGallery>
    </ImageWrapper>
  );
}
