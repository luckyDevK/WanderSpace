import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PreviousBtn() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="ghost"
      className="mt-5 ml-8 cursor-pointer border-2 border-slate-600"
    >
      <ArrowLeft />
      Back
    </Button>
  );
}
