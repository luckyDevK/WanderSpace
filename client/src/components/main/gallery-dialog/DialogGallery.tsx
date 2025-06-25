import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import type { IImage } from '../../../types/ImageType';
import ImageMeta from './ImageMeta';
import ImagePreview from './ImagePreview';
import ImageFooter from './ImageFooter';

interface DialogProps {
  children: React.ReactNode;
  place: IImage;
}

export function DialogGallery({ children, place }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-xl w-[90%] bg-white p-6 rounded-xl [&>button]:hidden">
        <ImageMeta
          category={place.category}
          createdBy={place.createdBy}
          location={place.location}
        />
        <ImagePreview imageUrl={place.imageUrl} title={place.title} />
        <ImageFooter
          description={place.description}
          title={place.title}
          imageUrl={place.imageUrl}
        />
      </DialogContent>
    </Dialog>
  );
}
