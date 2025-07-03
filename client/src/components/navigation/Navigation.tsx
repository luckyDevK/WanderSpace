import { Link } from 'react-router-dom';
import { Home, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import NavigationMenuWithActiveItem from './NavMenu';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Navigation() {
  const { token, handleSignOut } = useAuth() || {};
  const navigate = useNavigate();

  const navigationMenuItems = [
    { title: 'Home', href: '/', icon: Home, isRender: true },
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,

      isRender: token !== null,
    },
  ];

  return (
    <nav className="px-4 md:container mx-auto flex items-center justify-between ">
      <h1 className="capitalize text-2xl font-bold">wander space</h1>

      <NavigationMenuWithActiveItem navigationMenuItems={navigationMenuItems} />

      {!token && (
        <div className="hidden md:flex gap-4">
          <Button variant="outline" className="cursor-pointer">
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button className="cursor-pointer">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      )}

      {token && (
        <Button
          onClick={handleSignOut}
          variant="secondary"
          className="cursor-pointer hidden md:block"
        >
          Sign Out
        </Button>
      )}

      <div className="md:hidden ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => navigate('/')} className="py-2">
              Home
            </DropdownMenuItem>
            {token && (
              <DropdownMenuItem
                onClick={() => navigate('/dashboard')}
                className="py-2"
              >
                Admin
              </DropdownMenuItem>
            )}
            <div className="flex gap-2 my-2 mx-1">
              {token ? (
                <>
                  <DropdownMenuItem className="" asChild>
                    <Button onClick={handleSignOut} className="flex-1">
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="" asChild>
                    <Button
                      onClick={() => navigate('/signin')}
                      className="flex-1"
                    >
                      Sign in
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="" asChild>
                    <Button
                      onClick={() => navigate('/signup')}
                      className="flex-1"
                      variant="outline"
                    >
                      Sign up
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
