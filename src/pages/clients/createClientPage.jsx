import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "../../services/clientService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Loader2 } from "lucide-react";

const CreateClientPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Individual");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    gender: "Male",
    companyName: "",
    businessType: "",
    tinNumber: "",
    tradeLicenseNumber: "",
    phone: "",
    email: "",
    region: "",
    zone: "",
    wereda: "",
    kebele: "",
    houseNumber: "New",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        type, // Add the type from local state
      };
      await createClient(payload);
      navigate("/clients");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating client");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <Card>
        <CardHeader>
          <CardTitle>Add New Client</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Client Type Selection */}
            <div className='space-y-2'>
              <Label>Client Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder='Select type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Individual'>Individual</SelectItem>
                  <SelectItem value='Business'>
                    Business / Organization
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Fields */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {type === "Individual" ? (
                <>
                  <div className='space-y-2'>
                    <Label>First Name</Label>
                    <Input name='firstName' required onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Father Name</Label>
                    <Input name='fatherName' required onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Grandfather Name</Label>
                    <Input name='grandfatherName' onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Gender</Label>
                    <Select
                      onValueChange={(val) => handleSelectChange("gender", val)}
                      defaultValue='Male'
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Male'>Male</SelectItem>
                        <SelectItem value='Female'>Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className='space-y-2 md:col-span-2'>
                    <Label>Company Name</Label>
                    <Input
                      name='companyName'
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>TIN Number</Label>
                    <Input name='tinNumber' required onChange={handleChange} />
                  </div>
                  <div className='space-y-2'>
                    <Label>Business Type</Label>
                    <Input
                      name='businessType'
                      placeholder='e.g. PLC'
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            <div className='border-t border-slate-100 my-4'></div>

            {/* Common Contact Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label>Phone Number</Label>
                <Input
                  name='phone'
                  required
                  placeholder='09...'
                  onChange={handleChange}
                />
              </div>
              <div className='space-y-2'>
                <Label>Email (Optional)</Label>
                <Input name='email' type='email' onChange={handleChange} />
              </div>
            </div>

            {/* Address Info */}
            <div className='space-y-2 mt-4'>
              <Label className='text-base font-semibold text-slate-700'>
                Address Details
              </Label>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <div className='space-y-2'>
                  <Label>Region</Label>
                  <Input
                    name='region'
                    required
                    placeholder='e.g. Addis Ababa'
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Zone / Sub-city</Label>
                  <Input
                    name='zone'
                    required
                    placeholder='e.g. Bole'
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Wereda</Label>
                  <Input
                    name='wereda'
                    required
                    placeholder='03'
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Kebele</Label>
                  <Input
                    name='kebele'
                    required
                    placeholder='12'
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>House No.</Label>
                  <Input
                    name='houseNumber'
                    defaultValue='New'
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-4 mt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate("/clients")}
              >
                Cancel
              </Button>
              <Button type='submit' className='bg-blue-900' disabled={loading}>
                {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                Create Client
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClientPage;
