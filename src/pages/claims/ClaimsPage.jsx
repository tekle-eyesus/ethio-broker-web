import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getClaims } from "../../services/claimService";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Plus, Search, Filter, Loader2, AlertTriangle } from "lucide-react";

const ClaimsPage = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "all";
  const [search, setSearch] = useState("");

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (search) params.search = search;

      const data = await getClaims(params);
      setClaims(data.claims);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchClaims();
    }, 500);
    return () => clearTimeout(timer);
  }, [statusFilter, search]);

  const handleStatusChange = (val) => {
    setSearchParams(val === "all" ? {} : { status: val });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "Approved":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "Rejected":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      default:
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Claims</h1>
          <p className='text-slate-500 mt-1'>
            Manage incidents and track compensation.
          </p>
        </div>
        <Link to='/claims/new'>
          <Button className='bg-blue-900 hover:bg-blue-800 text-blue-100'>
            <Plus className='mr-2 h-4 w-4' /> Register Claim
          </Button>
        </Link>
      </div>

      <div className='flex gap-4 items-center bg-white p-4 rounded-md border shadow-sm'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
          <Input
            placeholder='Search Claim # or Description...'
            className='pl-9 bg-slate-50 border-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='w-[180px]'>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <Filter className='mr-2 h-4 w-4 text-slate-400' />
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent className='bg-white border rounded-md'>
              <SelectItem value='all'>All Statuses</SelectItem>
              <SelectItem value='Reported'>Reported</SelectItem>
              <SelectItem value='In Review'>In Review</SelectItem>
              <SelectItem value='Approved'>Approved</SelectItem>
              <SelectItem value='Paid'>Paid</SelectItem>
              <SelectItem value='Rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='rounded-md border bg-white shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim Number</TableHead>
              <TableHead>Client & Policy</TableHead>
              <TableHead>Incident Date</TableHead>
              <TableHead>Claim Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className='h-24 text-center'>
                  <Loader2 className='animate-spin h-6 w-6 mx-auto text-slate-400' />
                </TableCell>
              </TableRow>
            ) : claims.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='h-24 text-center text-slate-500'
                >
                  No claims found.
                </TableCell>
              </TableRow>
            ) : (
              claims.map((claim) => (
                <TableRow key={claim._id}>
                  <TableCell className='font-medium flex items-center gap-2'>
                    <AlertTriangle className='h-4 w-4 text-orange-500' />
                    {claim.claimNumber}
                  </TableCell>
                  <TableCell>
                    <div className='font-medium text-sm'>
                      {claim.client?.companyName || claim.client?.firstName}
                    </div>
                    <div className='text-xs text-slate-500'>
                      {claim.policy?.category} - {claim.policy?.policyNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(claim.dateOfIncident).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {claim.claimedAmount?.toLocaleString()} ETB
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(claim.status)}
                      variant='outline'
                    >
                      {claim.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link to={`/claims/${claim._id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClaimsPage;
