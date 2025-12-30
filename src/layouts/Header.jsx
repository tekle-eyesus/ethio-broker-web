import { useAuth } from "../store/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className='h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 fixed top-0 right-0 left-64 z-10'>
      <div className='flex items-center gap-4'>
        <div className='text-right mr-2'>
          <p className='text-sm font-medium text-slate-900'>{user?.fullName}</p>
          <p className='text-xs text-slate-500 capitalize'>{user?.role}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className='outline-none'>
            <Avatar className='cursor-pointer'>
              <AvatarImage src='' />
              <AvatarFallback className='bg-blue-100 text-blue-700'>
                {user?.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={logout}
              className='text-red-600 focus:text-red-600'
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
