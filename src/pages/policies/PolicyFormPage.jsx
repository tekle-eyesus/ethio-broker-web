import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPolicy,
  getPolicyById,
  updatePolicy,
} from "../../services/policyService";
import { getClients } from "../../services/clientService";
import { getCarriers } from "../../services/carrierService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
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

const PolicyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Dropdown Data
  const [clients, setClients] = useState([]);
  const [carriers, setCarriers] = useState([]);

  const [formData, setFormData] = useState({
    policyNumber: "",
    clientId: "",
    carrierId: "",
    category: "",
    subCategory: "",
    startDate: "",
    endDate: "",
    premiumAmount: "",
    commissionRate: "10", // Default 10%
  });

  // Load Dependencies (Clients & Carriers)
  useEffect(() => {
    const init = async () => {
      try {
        const [clientsData, carriersData] = await Promise.all([
          getClients({ limit: 100 }), // Fetch first 100 clients for MVP dropdown
          getCarriers(),
        ]);
        setClients(clientsData.clients);
        setCarriers(carriersData);

        if (isEditMode) {
          const policy = await getPolicyById(id);
          setFormData({
            policyNumber: policy.policyNumber,
            clientId: policy.client?._id,
            carrierId: policy.carrier?._id,
            category: policy.category,
            subCategory: policy.subCategory || "",
            startDate: policy.startDate.split("T")[0], // Format for input type=date
            endDate: policy.endDate.split("T")[0],
            premiumAmount: policy.premiumAmount,
            commissionRate: policy.commissionRate,
          });
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

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Ensure numeric values
      const payload = {
        ...formData,
        premiumAmount: Number(formData.premiumAmount),
        commissionRate: Number(formData.commissionRate),
      };

      if (isEditMode) {
        await updatePolicy(id, payload);
      } else {
        await createPolicy(payload);
      }
      navigate("/policies");
    } catch (error) {
      alert(
        "Operation failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Commission Calculation Preview
  const estimatedCommission =
    (Number(formData.premiumAmount || 0) *
      Number(formData.commissionRate || 0)) /
    100;

  if (loading)
    return (
      <div className='p-10 flex justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );

  return (
    <div className='max-w-4xl mx-auto mt-6'>
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Edit Policy" : "Issue New Policy"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* 1. Policy Identification */}
              <div className='space-y-2'>
                <Label>Policy Number</Label>
                <Input
                  name='policyNumber'
                  value={formData.policyNumber}
                  onChange={handleChange}
                  required
                  placeholder='e.g. MTR/001/24'
                />
              </div>

              <div className='space-y-2'>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => handleSelectChange("category", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Motor'>Motor</SelectItem>
                    <SelectItem value='Health'>Health / Medical</SelectItem>
                    <SelectItem value='Property'>Property / Fire</SelectItem>
                    <SelectItem value='Marine'>Marine</SelectItem>
                    <SelectItem value='Bond'>Bond</SelectItem>
                    <SelectItem value='Engineering'>Engineering</SelectItem>
                    <SelectItem value='Travel'>Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Stakeholders */}
              <div className='space-y-2'>
                <Label>Client</Label>
                <Select
                  value={formData.clientId}
                  onValueChange={(val) => handleSelectChange("clientId", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Client' />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.type === "Business"
                          ? c.companyName
                          : `${c.firstName} ${c.fatherName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className='space-y-2'>
                <Label>Insurance Carrier</Label>
                <Select
                  value={formData.carrierId}
                  onValueChange={(val) => handleSelectChange("carrierId", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Carrier' />
                  </SelectTrigger>
                  <SelectContent>
                    {carriers.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Dates */}
              <div className='space-y-2'>
                <Label>Start Date</Label>
                <Input
                  type='date'
                  name='startDate'
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label>End Date</Label>
                <Input
                  type='date'
                  name='endDate'
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className='border-t'></div>

            {/* 4. Financials */}
            <div className='bg-slate-50 p-4 rounded-md border'>
              <h3 className='font-semibold text-slate-800 mb-4'>
                Financial Details
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label>Premium Amount (ETB)</Label>
                  <Input
                    type='number'
                    name='premiumAmount'
                    value={formData.premiumAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Commission Rate (%)</Label>
                  <Input
                    type='number'
                    name='commissionRate'
                    value={formData.commissionRate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Estimated Commission</Label>
                  <div className='h-10 flex items-center px-3 border rounded bg-slate-100 text-slate-600 font-mono'>
                    {estimatedCommission.toLocaleString()} ETB
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-3'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate("/policies")}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-blue-900'
                disabled={submitting}
              >
                {submitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                {isEditMode ? "Update Policy" : "Issue Policy"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyFormPage;
