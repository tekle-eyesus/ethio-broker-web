import { useAuth } from "../../store/auth-context";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

const SettingsPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className='space-y-6 max-w-4xl mx-auto'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
          Settings
        </h1>
        <p className='text-slate-500 mt-1'>
          Manage your account preferences and profile.
        </p>
      </div>

      <Tabs defaultValue='profile' className='w-full'>
        <TabsList className='grid w-full grid-cols-3 lg:w-[400px]'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='preferences'>Preferences</TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value='profile' className='space-y-4 mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                View your personal details and system role.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-20 w-20'>
                  <AvatarImage src='' />
                  <AvatarFallback className='text-2xl bg-blue-100 text-blue-700 font-bold'>
                    {user?.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-xl font-medium text-slate-900'>
                    {user?.fullName}
                  </h3>
                  <p className='text-sm text-slate-500 capitalize bg-slate-100 inline-block px-2 py-0.5 rounded mt-1'>
                    {user?.role}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <Label className='text-slate-500'>Full Name</Label>
                  <Input
                    value={user?.fullName || ""}
                    disabled
                    className='bg-slate-50'
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-slate-500'>Username</Label>
                  <Input
                    value={user?.username || ""}
                    disabled
                    className='bg-slate-50'
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-slate-500'>Email Address</Label>
                  <Input
                    value={user?.email || ""}
                    disabled
                    className='bg-slate-50'
                  />
                </div>
                <div className='space-y-2'>
                  <Label className='text-slate-500'>User ID</Label>
                  <Input
                    value={user?._id || ""}
                    disabled
                    className='bg-slate-50 font-mono text-xs'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ACCOUNT TAB */}
        <TabsContent value='account' className='space-y-4 mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Update your password.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Current Password</Label>
                <Input type='password' placeholder='••••••••' />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>New Password</Label>
                  <Input type='password' />
                </div>
                <div className='space-y-2'>
                  <Label>Confirm Password</Label>
                  <Input type='password' />
                </div>
              </div>
              <div className='pt-2'>
                <Button disabled variant='secondary'>
                  Update Password
                </Button>
                <p className='text-xs text-slate-400 mt-2'>
                  Password updates will be enabled in future updates.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className='border-red-100 bg-red-50'>
            <CardHeader>
              <CardTitle className='text-red-700 text-lg'>
                Session Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-red-600 mb-4'>
                Sign out of your account on this device. You will need to log in
                again to access the dashboard.
              </p>
              <Button variant='destructive' onClick={logout}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PREFERENCES TAB (Mock for Ethiopian Context) */}
        <TabsContent value='preferences' className='space-y-4 mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Localization</CardTitle>
              <CardDescription>
                Adjust how dates and text are displayed.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>System Language</Label>
                  <select className='flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50'>
                    <option>English (US)</option>
                    <option>Amharic (Coming Soon)</option>
                  </select>
                </div>
                <div className='space-y-2'>
                  <Label>Calendar System</Label>
                  <select className='flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50'>
                    <option>Gregorian Calendar (GC)</option>
                    <option>Ethiopian Calendar (EC) (Coming Soon)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
