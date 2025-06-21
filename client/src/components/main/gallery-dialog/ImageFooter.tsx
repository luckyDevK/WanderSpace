import type { IImage } from '@/types/ImageType';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

type ImageFooterProps = Pick<IImage, 'title' | 'description'>;

export default function ImageFooter({ title, description }: ImageFooterProps) {
  return (
    <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-1 text-balance">{description}</p>
      </div>

      <div className="flex gap-3">
        <Button className="bg-emerald-500 text-white hover:bg-emerald-500/80 transition-colors duration-200 ease-in cursor-pointer">
          <Download />
          Download
        </Button>
        <Button variant="outline">
          Share
          <Share2 />
        </Button>
      </div>
    </div>
  );
}
