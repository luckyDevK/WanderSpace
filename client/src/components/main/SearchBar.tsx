import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SearchBar() {
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
          id="search"
          placeholder="Type a place or keyword..."
          className="focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:border-emerald-500"
        />

        <Button type="submit" className="  rounded-md  ">
          Go
        </Button>
      </div>
    </div>
  );
}
