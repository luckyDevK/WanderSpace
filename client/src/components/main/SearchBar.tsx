import { usePlacesContext } from '@/hooks/usePlaceContext';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SearchBar() {
  const { handleSearch } = usePlacesContext();
  return (
    <div className="w-full mx-auto max-w-md space-y-3">
      <Label
        htmlFor="search"
        className="block text-xl font-semibold text-foreground"
      >
        Search Places
      </Label>

      <div className="flex gap-x-4">
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          id="search"
          placeholder="Type a place or keyword..."
          className="focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:border-emerald-500"
        />
      </div>
    </div>
  );
}
