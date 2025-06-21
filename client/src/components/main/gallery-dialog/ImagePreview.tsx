import type { IImage } from '@/types/ImageType';

type ImagePreviewProps = Pick<IImage, 'imageUrl' | 'title'>;

export default function ImagePreview({ imageUrl, title }: ImagePreviewProps) {
  return (
    <div className="w-full flex justify-center items-center ">
      <img
        src={imageUrl}
        alt={title}
        className="w-full max-h-[70vh] object-contain rounded-md cursor-zoom-in"
      />
    </div>
  );
}
