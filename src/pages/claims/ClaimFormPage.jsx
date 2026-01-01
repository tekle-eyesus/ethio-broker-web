import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createClaim,
  getClaimById,
  updateClaim,
} from "../../services/claimService";
import { getPolicies } from "../../services/policyService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Loader2 } from "lucide-react";

const ClaimFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Data for Dropdown
  const [policies, setPolicies] = useState([]);

  const [formData, setFormData] = useState({
    claimNumber: "",
    policyId: "",
    dateOfIncident: "",
    description: "",
    claimedAmount: "",
    // Edit Mode Only Fields
    status: "Reported",
    approvedAmount: "0",
    notes: "",
  });

  useEffect(() => {
    const init = async () => {
      try {
        if (isEditMode) {
          const claim = await getClaimById(id);
          setFormData({
            claimNumber: claim.claimNumber,
            policyId: claim.policy?._id,
            dateOfIncident: claim.dateOfIncident.split("T")[0],
            description: claim.description,
            claimedAmount: claim.claimedAmount,
            status: claim.status,
            approvedAmount: claim.approvedAmount,
            notes: claim.notes || "",
          });
        } else {
          // Only need policies list for creation
          const policyData = await getPolicies({ status: "Active", limit: 50 });
          setPolicies(policyData.policies);
        }
      } catch (error) {
        console.error("Init failed", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...formData };

      if (isEditMode) {
        await updateClaim(id, payload);
      } else {
        await createClaim(payload);
      }
      navigate("/claims");
    } catch (error) {
      alert(
        "Operation failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className='p-10 flex justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );

  return (
    <div className='max-w-3xl mx-auto mt-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Update Claim Status" : "Register New Claim"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Create Mode: Policy Selection */}
            {!isEditMode && (
              <div className='space-y-2'>
                <Label>Select Policy</Label>
                <Select
                  onValueChange={(val) =>
                    setFormData({ ...formData, policyId: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select relevant policy...' />
                  </SelectTrigger>
                  <SelectContent className='bg-blue-50'>
                    {policies.map((p) => (
                      <SelectItem key={p._id} value={p._id}>
                        {p.policyNumber} -{" "}
                        {p.client?.firstName || p.client?.companyName} (
                        {p.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Claim Number</Label>
                <Input
                  name='claimNumber'
                  value={formData.claimNumber}
                  onChange={handleChange}
                  required
                  placeholder='CLM-2025-...'
                  disabled={isEditMode}
                />
              </div>
              <div className='space-y-2'>
                <Label>Date of Incident</Label>
                <Input
                  type='date'
                  name='dateOfIncident'
                  value={formData.dateOfIncident}
                  onChange={handleChange}
                  required
                  disabled={isEditMode}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label>Description of Incident</Label>
              <Textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                disabled={isEditMode}
              />
            </div>

            <div className='space-y-2'>
              <Label>Claimed Amount (ETB)</Label>
              <Input
                type='number'
                name='claimedAmount'
                value={formData.claimedAmount}
                onChange={handleChange}
                required
                disabled={isEditMode}
              />
            </div>

            {/* EDIT MODE: Status Workflow */}
            {isEditMode && (
              <div className='bg-slate-50 p-4 rounded-md border space-y-4 mt-6'>
                <h3 className='font-semibold text-slate-800'>
                  Processing Details
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(val) =>
                        setFormData({ ...formData, status: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Reported'>Reported</SelectItem>
                        <SelectItem value='In Review'>In Review</SelectItem>
                        <SelectItem value='Approved'>Approved</SelectItem>
                        <SelectItem value='Paid'>Paid</SelectItem>
                        <SelectItem value='Rejected'>Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label>Approved Amount</Label>
                    <Input
                      type='number'
                      name='approvedAmount'
                      value={formData.approvedAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Internal Notes / Remarks</Label>
                  <Textarea
                    name='notes'
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder='Surveyor comments...'
                  />
                </div>
              </div>
            )}

            <div className='flex justify-end gap-3 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate("/claims")}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-blue-900 text-blue-100'
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                {isEditMode ? "Update Claim" : "Submit Claim"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimFormPage;
