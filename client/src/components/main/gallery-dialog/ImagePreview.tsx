import { useRef, useState } from 'react';

import type { IPlaceUser } from '@/types/ImageType';

type ImagePreviewProps = Pick<IPlaceUser, 'imageUrl' | 'title'>;

export default function ImagePreview({ imageUrl, title }: ImagePreviewProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullScreen = () => {
    const isDocFullscreen = document.fullscreenElement;

    if (!isDocFullscreen) {
      setIsFullscreen((prev) => !prev);
      imgRef.current?.requestFullscreen();
    } else {
      setIsFullscreen((prev) => !prev);
      document.exitFullscreen();
    }
  };

  return (
    <img
      id="img"
      ref={imgRef}
      onClick={handleFullScreen}
      src={imageUrl}
      alt={title}
      className={`max-h-[30vh] w-full object-contain rounded-md ${isFullscreen ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
    />
  );
}
