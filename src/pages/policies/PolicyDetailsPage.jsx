import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPolicyById, deletePolicy } from "../../services/policyService";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Loader2, ArrowLeft, Edit, Trash2, FileText } from "lucide-react";

const PolicyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPolicyById(id)
      .then(setPolicy)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deletePolicy(id);
      navigate("/policies");
    } catch (err) {
      alert("Failed to delete");
    }
  };

  if (loading)
    return (
      <div className='p-10'>
        <Loader2 className='animate-spin' />
      </div>
    );
  if (!policy) return <div>Policy Not Found</div>;

  return (
    <div className='space-y-6 max-w-4xl mx-auto mt-6'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <Link
              to='/policies'
              className='text-slate-400 hover:text-slate-600'
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className='text-2xl font-bold'>{policy.policyNumber}</h1>
          </div>
          <div className='flex gap-2 pl-7'>
            <Badge variant='outline'>{policy.category}</Badge>
            <Badge
              variant={policy.status === "Active" ? "default" : "secondary"}
            >
              {policy.status}
            </Badge>
          </div>
        </div>
        <div className='flex gap-2'>
          <Link to={`/policies/${id}/edit`}>
            <Button variant='outline'>
              <Edit className='mr-2 h-4 w-4' /> Edit
            </Button>
          </Link>
          <Button variant='destructive' onClick={handleDelete}>
            <Trash2 className='mr-2 h-4 w-4' /> Delete
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Entities</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='text-slate-500 text-sm'>Insured Client</div>
              <div className='font-medium text-lg'>
                {policy.client?.companyName ||
                  `${policy.client?.firstName} ${policy.client?.fatherName}`}
              </div>
            </div>
            <div>
              <div className='text-slate-500 text-sm'>Insurance Carrier</div>
              <div className='font-medium text-lg'>{policy.carrier?.name}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Financials</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between border-b pb-2'>
              <span className='text-slate-500'>Premium</span>
              <span className='font-bold'>
                {policy.premiumAmount?.toLocaleString()} ETB
              </span>
            </div>
            <div className='flex justify-between border-b pb-2'>
              <span className='text-slate-500'>
                Commission ({policy.commissionRate}%)
              </span>
              <span className='font-bold text-green-600'>
                {policy.commissionAmount?.toLocaleString()} ETB
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle className='text-lg'>Period & Dates</CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-2 gap-6'>
            <div>
              <div className='text-slate-500 text-sm'>Start Date</div>
              <div>{new Date(policy.startDate).toDateString()}</div>
            </div>
            <div>
              <div className='text-slate-500 text-sm'>End Date (Expiry)</div>
              <div className='text-red-600 font-medium'>
                {new Date(policy.endDate).toDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PolicyDetailsPage;
