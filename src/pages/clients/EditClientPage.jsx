import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientById, updateClient } from "../../services/clientService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Loader2 } from "lucide-react";

const EditClientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // We keep type separate because we usually don't allow changing Type on Edit (complex validation)
  const [type, setType] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    gender: "",
    companyName: "",
    businessType: "",
    tinNumber: "",
    phone: "",
    email: "",
    region: "",
    zone: "",
    wereda: "",
    kebele: "",
    houseNumber: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getClientById(id);
        setType(data.type);
        // Fill form data (handling nulls)
        setFormData({
          firstName: data.firstName || "",
          fatherName: data.fatherName || "",
          grandfatherName: data.grandfatherName || "",
          gender: data.gender || "",
          companyName: data.companyName || "",
          businessType: data.businessType || "",
          tinNumber: data.tinNumber || "",
          phone: data.phone || "",
          email: data.email || "",
          region: data.region || "",
          zone: data.zone || "",
          wereda: data.wereda || "",
          kebele: data.kebele || "",
          houseNumber: data.houseNumber || "",
        });
      } catch (error) {
        console.error("Error loading client", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateClient(id, formData);
      navigate(`/clients/${id}`); // Go back to details page
    } catch (error) {
      alert("Error updating client");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className='p-10'>
        <Loader2 className='animate-spin h-6 w-6' />
      </div>
    );

  return (
    <div className='max-w-3xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>
            Edit Client:{" "}
            {type === "Individual" ? formData.firstName : formData.companyName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Conditional Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {type === "Individual" ? (
                <>
                  <div className='space-y-2'>
                    <Label>First Name</Label>
                    <Input
                      name='firstName'
                      value={formData.firstName}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Father Name</Label>
                    <Input
                      name='fatherName'
                      value={formData.fatherName}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Grandfather Name</Label>
                    <Input
                      name='grandfatherName'
                      value={formData.grandfatherName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='space-y-2 md:col-span-2'>
                    <Label>Company Name</Label>
                    <Input
                      name='companyName'
                      value={formData.companyName}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>TIN Number</Label>
                    <Input
                      name='tinNumber'
                      value={formData.tinNumber}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Business Type</Label>
                    <Input
                      name='businessType'
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            <div className='border-t border-slate-100 my-4'></div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Phone Number</Label>
                <Input
                  name='phone'
                  value={formData.phone}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label>Email</Label>
                <Input
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className='space-y-2 mt-4'>
              <Label className='font-semibold text-slate-700'>
                Address Details
              </Label>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label>Region</Label>
                  <Input
                    name='region'
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Zone</Label>
                  <Input
                    name='zone'
                    value={formData.zone}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Wereda</Label>
                  <Input
                    name='wereda'
                    value={formData.wereda}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Kebele</Label>
                  <Input
                    name='kebele'
                    value={formData.kebele}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>House No.</Label>
                  <Input
                    name='houseNumber'
                    value={formData.houseNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-4 mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(`/clients/${id}`)}
              >
                Cancel
              </Button>
              <Button type='submit' className='bg-blue-900' disabled={saving}>
                {saving && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditClientPage;
