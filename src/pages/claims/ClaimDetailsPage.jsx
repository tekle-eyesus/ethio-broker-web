import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClaimById, uploadClaimDocument } from "../../services/claimService";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Loader2, ArrowLeft, Edit, FileText } from "lucide-react";

const ClaimDetailsPage = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);

  const fetchClaim = async () => {
    try {
      const data = await getClaimById(id);
      setClaim(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaim();
  }, [id]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !docType) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("document", file);
      fd.append("docType", docType);
      await uploadClaimDocument(id, fd);
      setFile(null);
      setDocType("");
      fetchClaim();
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className='p-10'>
        <Loader2 className='animate-spin' />
      </div>
    );
  if (!claim) return <div>Claim Not Found</div>;

  return (
    <div className='space-y-6 max-w-5xl mx-auto mt-6'>
      <div className='flex justify-between items-start'>
        <div className='flex items-center gap-2'>
          <Link to='/claims' className='text-slate-400 hover:text-slate-600'>
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className='text-2xl font-bold'>{claim.claimNumber}</h1>
            <div className='flex gap-2 mt-1'>
              <Badge>{claim.status}</Badge>
              <span className='text-sm text-slate-500'>
                Incident: {new Date(claim.dateOfIncident).toDateString()}
              </span>
            </div>
          </div>
        </div>
        <Link to={`/claims/${id}/edit`}>
          <Button variant='outline'>
            <Edit className='mr-2 h-4 w-4' /> Update Status
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='text-lg'>Incident Details</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='text-slate-500 text-sm'>Policy Reference</div>
              <div className='font-medium'>
                <Link
                  to={`/policies/${claim.policy?._id}`}
                  className='text-blue-600 hover:underline'
                >
                  {claim.policy?.policyNumber} ({claim.policy?.category})
                </Link>
              </div>
            </div>
            <div>
              <div className='text-slate-500 text-sm'>Client</div>
              <div className='font-medium'>
                {claim.client?.firstName} {claim.client?.fatherName}{" "}
                {claim.client?.companyName}
              </div>
            </div>
            <div>
              <div className='text-slate-500 text-sm'>Description</div>
              <p className='text-sm bg-slate-50 p-3 rounded border'>
                {claim.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Financials</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between border-b pb-2'>
                <span className='text-slate-500'>Claimed Amount</span>
                <span className='font-bold'>
                  {claim.claimedAmount?.toLocaleString()} ETB
                </span>
              </div>
              <div className='flex justify-between border-b pb-2'>
                <span className='text-slate-500'>Approved Amount</span>
                <span className='font-bold text-green-600'>
                  {claim.approvedAmount?.toLocaleString()} ETB
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Evidence / Documents</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <form onSubmit={handleUpload} className='flex gap-2 items-end'>
                <div className='flex-1 space-y-1'>
                  <Label className='text-xs'>Type</Label>
                  <Input
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    placeholder='e.g. Police Report'
                    className='h-8 text-xs'
                  />
                </div>
                <div className='flex-1 space-y-1'>
                  <Label className='text-xs'>File</Label>
                  <Input
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])}
                    className='h-8 text-xs pt-1'
                  />
                </div>
                <Button
                  size='sm'
                  type='submit'
                  disabled={uploading}
                  className='h-8'
                >
                  {uploading ? "..." : "Add"}
                </Button>
              </form>

              <div className='space-y-2 mt-2'>
                {claim.documents?.map((doc, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-center text-sm p-2 bg-slate-50 border rounded'
                  >
                    <div className='flex items-center gap-2'>
                      <FileText size={14} className='text-blue-500' />
                      <span>{doc.docType}</span>
                    </div>
                    <a
                      href={`http://localhost:8000${doc.url}`}
                      target='_blank'
                      rel='noreferrer'
                      className='text-blue-600 text-xs hover:underline'
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetailsPage;
