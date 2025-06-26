import { useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeClosed } from 'lucide-react';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

type TogglePwProps = InputHTMLAttributes<HTMLInputElement>;

export default function TogglePw(props: TogglePwProps) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="flex">
      <Input {...props} className="mr-1" type={showPw ? 'text' : 'password'} />
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
