import type { IImage } from '@/types/ImageType';
import { downloadImg } from '@/lib/utils';

type ImageContentProps = Pick<IImage, 'imageUrl' | 'title'>;

type ImageWrapperProps = { children: React.ReactNode } & ImageContentProps;

export default function ImageWrapper({
  imageUrl,
  title,
  children,
}: ImageWrapperProps) {
  return (
    <div className="relative overflow-hidden rounded-xl group transition-shadow duration-300 hover:shadow-md cursor-zoom-in">
      {children}

      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between px-4 pb-3 text-white">
        <span className="text-sm font-semibold">{title}</span>
        <span
          onClick={() => downloadImg(imageUrl, `${title}.jpg`)}
          className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded text-sm cursor-pointer"
        >
          Download
        </span>
      </div>
    </div>
  );
}
