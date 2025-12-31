import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPolicies } from "../../services/policyService";
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
import { Plus, Search, Filter, Loader2 } from "lucide-react";

const PoliciesPage = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const statusFilter = searchParams.get("status") || "all";
  const [search, setSearch] = useState("");

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      // Note: Backend might need text search implementation for policies if not already present
      // For now we filter by status

      const data = await getPolicies(params);
      setPolicies(data.policies);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [statusFilter]); // Re-fetch when filter changes

  const handleStatusChange = (val) => {
    setSearchParams(val === "all" ? {} : { status: val });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 hover:bg-green-100";
      case "Expired":
        return "bg-red-100 text-red-700 hover:bg-red-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Policies</h1>
          <p className='text-slate-500 mt-1'>
            Track active coverage and renewals.
          </p>
        </div>
        <Link to='/policies/new'>
          <Button className='bg-blue-900 hover:bg-blue-800 text-blue-100'>
            <Plus className='mr-2 h-4 w-4' /> Create Policy
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className='flex gap-4 items-center bg-white p-4 rounded-md border shadow-sm'>
        <div className='flex-1 relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
          <Input
            placeholder='Search Policy Number...'
            className='pl-9 bg-slate-50 border-none'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='w-[180px]'>
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <Filter className='mr-2 h-4 w-4 text-slate-700' />
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent className='bg-white border rounded-md'>
              <SelectItem value='all'>All Statuses</SelectItem>
              <SelectItem value='Active'>Active</SelectItem>
              <SelectItem value='Pending'>Pending</SelectItem>
              <SelectItem value='Expired'>Expired</SelectItem>
              <SelectItem value='Cancelled'>Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className='rounded-md border bg-white shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Carrier / Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className='h-24 text-center'>
                  <Loader2 className='animate-spin h-6 w-6 mx-auto text-slate-400' />
                </TableCell>
              </TableRow>
            ) : policies.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className='h-24 text-center text-slate-500'
                >
                  No policies found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              policies.map((policy) => (
                <TableRow key={policy._id}>
                  <TableCell className='font-medium'>
                    {policy.policyNumber}
                  </TableCell>
                  <TableCell>
                    {policy.client?.companyName ||
                      policy.client?.firstName +
                        " " +
                        policy.client?.fatherName}
                  </TableCell>
                  <TableCell>
                    <div className='font-medium text-xs'>
                      {policy.carrier?.name}
                    </div>
                    <div className='text-slate-500 text-xs'>
                      {policy.category}
                    </div>
                  </TableCell>
                  <TableCell className='text-xs'>
                    <div>{new Date(policy.startDate).toLocaleDateString()}</div>
                    <div className='text-slate-400'>to</div>
                    <div>{new Date(policy.endDate).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell className='font-mono text-sm'>
                    {policy.premiumAmount?.toLocaleString()} ETB
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(policy.status)}
                      variant='outline'
                    >
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link to={`/policies/${policy._id}`}>View</Link>
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

export default PoliciesPage;
