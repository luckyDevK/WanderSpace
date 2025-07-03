import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import type { IPlaceUser } from '../../../types/ImageType';
import ImageMeta from './ImageMeta';
import ImagePreview from './ImagePreview';
import ImageFooter from './ImageFooter';
import ImageWrapper from '../ImageWrapper';

export function DialogGallery({
  title,
  location,
  imageUrl,
  description,
  createdBy,
  category,
}: Omit<IPlaceUser, '_id' | 'createdAt'>) {
  return (
    <Dialog>
      <DialogTrigger>
        <ImageWrapper imageUrl={imageUrl} title={title} />
      </DialogTrigger>

      <DialogContent className="max-w-xl w-[90%] bg-white p-6 rounded-xl [&>button]:hidden">
        <ImageMeta
          category={category}
          createdBy={createdBy}
          location={location}
        />
        <ImagePreview imageUrl={imageUrl} title={title} />
        <ImageFooter
          description={description}
          title={title}
          imageUrl={imageUrl}
        />
      </DialogContent>
    </Dialog>
  );
}
