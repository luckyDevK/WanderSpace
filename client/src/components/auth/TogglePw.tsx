import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function TogglePw() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex">
      <Input
        id="password"
        className="mr-1"
        type={showPw ? 'text' : 'password'}
        required
      />
      <Button
        type="button"
        onClick={() => setShowPw((prev) => !prev)}
        className="cursor-pointer"
        variant="secondary"
        size="icon"
      >
        {showPw ? <EyeClosed /> : <Eye />}
      </Button>
    </div>
  );
}
