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
        alert("Could not load client details");
        navigate("/clients");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      console.log("Submitting update for ID:", id, formData);
      await updateClient(id, formData);
      console.log("Update successful, navigating back...");

      // Force navigation back to details
      navigate(`/clients/${id}`);
    } catch (error) {
      console.error("Update error:", error);
      alert(
        "Error updating client: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/clients/${id}`);
  };

  if (loading)
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader2 className='animate-spin h-8 w-8 text-blue-900' />
      </div>
    );

  return (
    <div className='max-w-3xl mx-auto py-6'>
      <Card className='shadow-md'>
        <CardHeader className='bg-slate-50 border-b'>
          <CardTitle className='text-xl text-slate-800'>
            Edit:{" "}
            {type === "Individual" ? formData.firstName : formData.companyName}
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Identity Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              {type === "Individual" ? (
                <>
                  <div className='space-y-2'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='fatherName'>Father Name</Label>
                    <Input
                      id='fatherName'
                      name='fatherName'
                      value={formData.fatherName}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='grandfatherName'>Grandfather Name</Label>
                    <Input
                      id='grandfatherName'
                      name='grandfatherName'
                      value={formData.grandfatherName}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='space-y-2 md:col-span-2'>
                    <Label htmlFor='companyName'>Company Name</Label>
                    <Input
                      id='companyName'
                      name='companyName'
                      value={formData.companyName}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='tinNumber'>TIN Number</Label>
                    <Input
                      id='tinNumber'
                      name='tinNumber'
                      value={formData.tinNumber}
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='businessType'>Business Type</Label>
                    <Input
                      id='businessType'
                      name='businessType'
                      value={formData.businessType}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            <div className='border-t border-slate-100 my-2'></div>

            {/* Contact Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Phone Number</Label>
                <Input
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className='space-y-3 p-4 bg-slate-50 rounded-md border'>
              <h3 className='font-semibold text-slate-700 text-sm'>
                Address Details
              </h3>
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

            <div className='flex justify-end gap-3 mt-6 pt-4 border-t'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                className='bg-blue-900 hover:bg-blue-800 min-w-[140px] text-blue-100'
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditClientPage;
