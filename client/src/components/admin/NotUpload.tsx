import { FileX } from 'lucide-react';

import { PlaceDialog } from './NewPlaceDialog';
import { Button } from '../ui/button';

export default function NotUpload() {
  return (
    <div className="max-w-4xl w-full  px-6 py-10 border-2 border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center md:items-start gap-3">
        <FileX className="w-10 h-10 text-primary" />
        <h3 className="text-xl font-semibold">No place yet</h3>
        <p className="text-muted-foreground text-center md:text-left">
          You haven’t uploaded any content yet. Start by adding your first
          place!
        </p>
      </div>
      <PlaceDialog isEdit={false} />
    </div>
  );
}
