import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import NavigationMenuWithActiveItem from './NavMenu';

import { Menu } from 'lucide-react';

export default function Navigation() {
  return (
    <nav className="px-4 md:container mx-auto flex items-center justify-between ">
      <h1 className="capitalize text-2xl font-bold">wander space</h1>

      <NavigationMenuWithActiveItem />

      <div className="hidden md:flex gap-4">
        <Button variant="outline" className="cursor-pointer">
          <Link to="/signin">Sign In</Link>
        </Button>
        <Button className="cursor-pointer">
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>

      <div className="md:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem className="py-2">Home</DropdownMenuItem>
            <DropdownMenuItem className="py-2">Admin</DropdownMenuItem>
            <DropdownMenuItem className="py-2">Sign In</DropdownMenuItem>
            <DropdownMenuItem className="py-2">Sign Up</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
