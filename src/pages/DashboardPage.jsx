import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import { useAuth } from "../store/auth-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  Users,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  Loader2,
  Calendar,
  Wallet,
  PlusCircle,
} from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <div className='h-full flex items-center justify-center p-10'>
        <Loader2 className='h-8 w-8 animate-spin text-slate-400' />
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* 1. Welcome Section */}
      <div className='flex justify-between items-end'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-slate-900'>
            {greeting}, {user?.firstName || "Broker"}!
          </h1>
          <p className='text-slate-500 mt-1'>
            Here is what's happening in your agency today.
          </p>
        </div>
        <div className='flex gap-2'>
          <Link to='/policies/new'>
            <Button className='bg-blue-900 hover:bg-blue-800 text-blue-100'>
              <PlusCircle className='mr-2 h-4 w-4' /> New Policy
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='border-l-4 border-l-blue-500 shadow-sm'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-slate-500'>
              Total Clients
            </CardTitle>
            <Users className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalClients}</div>
            <p className='text-xs text-slate-500 mt-1'>Registered in system</p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-green-500 shadow-sm'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-slate-500'>
              Active Policies
            </CardTitle>
            <FileCheck className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.activePolicies}</div>
            <p className='text-xs text-slate-500 mt-1'>
              Currently coverage active
            </p>
          </CardContent>
        </Card>

        <Card className='border-l-4 border-l-orange-500 shadow-sm'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium text-slate-500'>
              Pending Claims
            </CardTitle>
            <AlertTriangle className='h-4 w-4 text-orange-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.pendingClaims}</div>
            <p className='text-xs text-slate-500 mt-1'>Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* 3. Expiring Policies (Main Widget) */}
        <Card className='lg:col-span-2 shadow-sm'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Renewals Due</CardTitle>
              <p className='text-sm text-slate-500 mt-1'>
                Policies expiring in the next 30 days.
              </p>
            </div>
            <Link to='/policies?expiringSoon=true'>
              <Button variant='ghost' size='sm' className='text-blue-600'>
                View All <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Carrier / Type</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className='text-right'>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.expiringPolicies.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className='h-24 text-center text-slate-500'
                    >
                      <FileCheck className='h-8 w-8 mx-auto mb-2 text-green-400 opacity-50' />
                      No immediate renewals found.
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.expiringPolicies.map((policy) => (
                    <TableRow key={policy._id}>
                      <TableCell className='font-medium'>
                        {policy.client?.companyName || policy.client?.firstName}
                      </TableCell>
                      <TableCell>
                        <div className='text-xs font-semibold'>
                          {policy.carrier?.alias}
                        </div>
                        <div className='text-xs text-slate-500'>
                          {policy.category}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center text-red-600 font-medium text-sm'>
                          <Calendar className='mr-2 h-3 w-3' />
                          {new Date(policy.endDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant='outline' size='sm' asChild>
                          <Link to={`/policies/${policy._id}/edit`}>Renew</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 4. Quick Actions Widget */}
        <Card className='shadow-sm bg-slate-50 border-slate-200'>
          <CardHeader>
            <CardTitle className='text-lg'>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Link to='/clients/new'>
              <div className='mb-2 group flex items-center justify-between p-4 bg-white rounded-lg border hover:border-blue-400 transition-colors cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-100 text-blue-600 rounded-full'>
                    <Users size={18} />
                  </div>
                  <span className='font-medium text-slate-700'>Add Client</span>
                </div>
                <ArrowRight
                  size={16}
                  className='text-slate-300 group-hover:text-blue-500'
                />
              </div>
            </Link>

            <Link to='/policies/new'>
              <div className='mb-2 group flex items-center justify-between p-4 bg-white rounded-lg border hover:border-green-400 transition-colors cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-green-100 text-green-600 rounded-full'>
                    <FileCheck size={18} />
                  </div>
                  <span className='font-medium text-slate-700'>
                    Issue Policy
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className='text-slate-300 group-hover:text-green-500'
                />
              </div>
            </Link>

            <Link to='/claims/new'>
              <div className='mb-2 group flex items-center justify-between p-4 bg-white rounded-lg border hover:border-orange-400 transition-colors cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-orange-100 text-orange-600 rounded-full'>
                    <AlertTriangle size={18} />
                  </div>
                  <span className='font-medium text-slate-700'>
                    Register Claim
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className='text-slate-300 group-hover:text-orange-500'
                />
              </div>
            </Link>

            <Link to='/finance'>
              <div className='mb-2 group flex items-center justify-between p-4 bg-white rounded-lg border hover:border-purple-400 transition-colors cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-purple-100 text-purple-600 rounded-full'>
                    <Wallet size={18} />
                  </div>
                  <span className='font-medium text-slate-700'>
                    Finance Report
                  </span>
                </div>
                <ArrowRight
                  size={16}
                  className='text-slate-300 group-hover:text-purple-500'
                />
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
