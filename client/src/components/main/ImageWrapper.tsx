import type { IPlaceUser } from '@/types/ImageType';
import { downloadImg } from '@/lib/utils';

type ImageContentProps = Pick<IPlaceUser, 'imageUrl' | 'title'>;

type ImageWrapperProps = ImageContentProps;

export default function ImageWrapper({ imageUrl, title }: ImageWrapperProps) {
  return (
    <div className="relative overflow-hidden rounded-xl group transition-shadow duration-300 hover:shadow-md cursor-zoom-in">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between px-4 pb-3 text-white">
        <span className="text-sm font-semibold">{title}</span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            downloadImg(imageUrl, `${title}.jpg`);
          }}
          className="bg-white/10 hover:bg-white/20  px-3 py-1 rounded-md text-sm cursor-pointer"
        >
          Download
        </span>
      </div>
    </div>
  );
}
