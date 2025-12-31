import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCarrier,
  getCarriers,
  updateCarrier,
} from "../../services/carrierService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Loader2, Plus, X } from "lucide-react";

const CarrierFormPage = () => {
  const { id } = useParams(); // If ID exists, it's Edit Mode
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    contactInfo: { phone: "", email: "", address: "", website: "" },
    commissionDefaults: [], // Array of { policyType, percentage }
  });

  // Commission Input State
  const [newComm, setNewComm] = useState({ policyType: "", percentage: "" });

  useEffect(() => {
    if (isEditMode) {
      // Fetch list and find specific carrier (Since we lack getById endpoint for now)
      getCarriers().then((list) => {
        const found = list.find((c) => c._id === id);
        if (found) {
          // Ensure nested objects exist to avoid undefined errors
          setFormData({
            name: found.name,
            alias: found.alias || "",
            contactInfo: {
              phone: found.contactInfo?.phone || "",
              email: found.contactInfo?.email || "",
              address: found.contactInfo?.address || "",
              website: found.contactInfo?.website || "",
            },
            commissionDefaults: found.commissionDefaults || [],
          });
        }
        setLoading(false);
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    if (e.target.name.startsWith("contact.")) {
      const field = e.target.name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [field]: e.target.value },
      }));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addCommission = () => {
    if (newComm.policyType && newComm.percentage) {
      setFormData((prev) => ({
        ...prev,
        commissionDefaults: [
          ...prev.commissionDefaults,
          { ...newComm, percentage: Number(newComm.percentage) },
        ],
      }));
      setNewComm({ policyType: "", percentage: "" });
    }
  };

  const removeCommission = (index) => {
    const updated = formData.commissionDefaults.filter((_, i) => i !== index);
    setFormData({ ...formData, commissionDefaults: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEditMode) {
        await updateCarrier(id, formData);
      } else {
        await createCarrier(formData);
      }
      navigate("/carriers");
    } catch (error) {
      alert("Operation failed: " + error.message);
    } finally {
      setSaving(false);
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
            {isEditMode ? "Edit Carrier" : "Add Insurance Company"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Basic Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Company Name</Label>
                <Input
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder='e.g. Awash Insurance'
                />
              </div>
              <div className='space-y-2'>
                <Label>Alias / Code</Label>
                <Input
                  name='alias'
                  value={formData.alias}
                  onChange={handleChange}
                  placeholder='e.g. AIC'
                />
              </div>
            </div>

            <div className='border-t'></div>

            {/* Contact Info */}
            <h3 className='text-sm font-semibold text-slate-700'>
              Contact Details
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Phone</Label>
                <Input
                  name='contact.phone'
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label>Email</Label>
                <Input
                  name='contact.email'
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2 md:col-span-2'>
                <Label>HQ Address</Label>
                <Input
                  name='contact.address'
                  value={formData.contactInfo.address}
                  onChange={handleChange}
                  placeholder='Sub-city, Building, Floor...'
                />
              </div>
            </div>

            <div className='border-t'></div>

            {/* Commission Defaults */}
            <div className='space-y-3 bg-slate-50 p-4 rounded-md border'>
              <h3 className='text-sm font-semibold text-slate-700'>
                Commission Agreements
              </h3>
              <p className='text-xs text-slate-500'>
                Define standard rates per policy type to auto-fill later.
              </p>

              <div className='flex gap-2 items-end'>
                <div className='space-y-1 flex-1'>
                  <Label className='text-xs'>Policy Type</Label>
                  <Input
                    placeholder='e.g. Motor'
                    value={newComm.policyType}
                    onChange={(e) =>
                      setNewComm({ ...newComm, policyType: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-1 w-24'>
                  <Label className='text-xs'>Rate (%)</Label>
                  <Input
                    type='number'
                    placeholder='10'
                    value={newComm.percentage}
                    onChange={(e) =>
                      setNewComm({ ...newComm, percentage: e.target.value })
                    }
                  />
                </div>
                <Button
                  type='button'
                  size='sm'
                  onClick={addCommission}
                  variant='secondary'
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </div>

              <div className='space-y-2 mt-2'>
                {formData.commissionDefaults.map((comm, idx) => (
                  <div
                    key={idx}
                    className='flex justify-between items-center bg-white p-2 rounded border text-sm'
                  >
                    <span>{comm.policyType}</span>
                    <div className='flex items-center gap-3'>
                      <span className='font-bold'>{comm.percentage}%</span>
                      <button
                        type='button'
                        onClick={() => removeCommission(idx)}
                        className='text-slate-400 hover:text-red-600'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                ))}
                {formData.commissionDefaults.length === 0 && (
                  <p className='text-xs text-slate-400 italic'>
                    No defaults set.
                  </p>
                )}
              </div>
            </div>

            <div className='flex justify-end gap-3 mt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate("/carriers")}
              >
                Cancel
              </Button>
              <Button type='submit' className='bg-blue-900' disabled={saving}>
                {saving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                {isEditMode ? "Update Carrier" : "Create Carrier"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierFormPage;
