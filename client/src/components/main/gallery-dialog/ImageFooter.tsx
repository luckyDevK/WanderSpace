import { DialogTitle } from '@radix-ui/react-dialog';
import type { IImage } from '@/types/ImageType';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

import { downloadImg } from '@/lib/utils';

type ImageFooterProps = Pick<IImage, 'title' | 'description' | 'imageUrl'>;

export default function ImageFooter({
  title,
  description,
  imageUrl,
}: ImageFooterProps) {
  return (
    <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full">
      <div className="flex-1 min-w-0">
        <DialogTitle className="text-2xl font-bold text-foreground">
          {title}
        </DialogTitle>
        <p className="text-muted-foreground mt-1 break-words">{description}</p>
      </div>

      <div className="flex-shrink-0 flex gap-3">
        <Button
          onClick={() => downloadImg(imageUrl, `${title}.jpg`)}
          className="bg-emerald-500 text-white hover:bg-emerald-500/80 transition-colors duration-200 ease-in cursor-pointer"
        >
          <Download />
          Download
        </Button>
        <Button variant="outline" className="cursor-pointer">
          Share
          <Share2 />
        </Button>
      </div>
    </div>
  );
}
