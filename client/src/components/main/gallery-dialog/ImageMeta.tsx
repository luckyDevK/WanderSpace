import type { IImage } from '@/types/ImageType';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';

type ImageMeta = Pick<IImage, 'category' | 'location' | 'createdBy'>;

export default function ImageMeta({
  category,
  createdBy,
  location,
}: ImageMeta) {
  return (
    <div className="flex flex-wrap gap-y-5 justify-between mb-4 text-sm text-muted-foreground ">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="bg-muted px-3 py-1 rounded-full text-foreground/80">
          🏷️ <span className="font-medium">{category}</span>
        </span>
        <span className="bg-muted px-3 py-1 rounded-full text-foreground/80">
          📍 <span className="font-medium">{location}</span>
        </span>
      </div>

      <p className="flex items-center gap-2 font-semibold text-foreground">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>{' '}
        {!createdBy.username ? 'sakon' : createdBy.username}
      </p>
    </div>
  );
}
