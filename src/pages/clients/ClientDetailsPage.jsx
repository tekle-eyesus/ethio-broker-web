import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getClientById,
  deleteClient,
  uploadClientDocument,
} from "../../services/clientService";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Loader2, Trash2, Edit, FileText, MapPin } from "lucide-react";

const ClientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("");

  const fetchClient = async () => {
    try {
      const data = await getClientById(id);
      setClient(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClient();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteClient(id);
      navigate("/clients");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete client");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !docType) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("document", file);
    formData.append("docType", docType);

    try {
      await uploadClientDocument(id, formData);
      setFile(null);
      setDocType("");
      // Force reload to show new document
      await fetchClient();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className='p-10 flex justify-center'>
        <Loader2 className='animate-spin h-8 w-8' />
      </div>
    );
  if (!client) return <div className='p-10 text-red-500'>Client not found</div>;

  return (
    <div className='space-y-6 max-w-5xl mx-auto pb-10 mt-6'>
      {/* Header Section */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg border shadow-sm'>
        <div>
          <h1 className='text-2xl font-bold text-slate-900'>
            {client.type === "Individual"
              ? `${client.firstName} ${client.fatherName}`
              : client.companyName}
          </h1>
          <div className='flex items-center gap-3 mt-2'>
            <Badge variant='secondary' className='px-2 py-1'>
              {client.type}
            </Badge>
            <div className='flex items-center text-sm text-slate-500'>
              <MapPin size={14} className='mr-1' />
              {client.region} - {client.zone}
            </div>
          </div>
        </div>

        <div className='flex gap-3'>
          <Button
            variant='outline'
            onClick={() => navigate(`/clients/${id}/edit`)}
          >
            <Edit className='mr-2 h-4 w-4' /> Edit Profile
          </Button>

          <AlertDialog children>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <Trash2 className='mr-2 h-4 w-4' /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Client?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently
                  soft-delete the client from your active list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className='bg-red-600 hover:bg-red-700'
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue='details' className='w-full'>
        <TabsList className='grid w-full grid-cols-2 max-w-[400px]'>
          <TabsTrigger value='details'>Client Details</TabsTrigger>
          <TabsTrigger value='documents'>
            Documents ({client.documents?.length || 0})
          </TabsTrigger>
        </TabsList>

        {/* DETAILS TAB */}
        <TabsContent value='details' className='mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Contact Info</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 text-sm'>
                <div className='flex justify-between border-b pb-2'>
                  <span className='text-slate-500'>Phone:</span>
                  <span className='font-medium'>{client.phone}</span>
                </div>
                <div className='flex justify-between border-b pb-2'>
                  <span className='text-slate-500'>Email:</span>
                  <span className='font-medium'>{client.email || "N/A"}</span>
                </div>
                {client.type === "Business" && (
                  <div className='flex justify-between border-b pb-2'>
                    <span className='text-slate-500'>TIN Number:</span>
                    <span className='font-medium'>{client.tinNumber}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Address</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4 text-sm'>
                <div className='flex justify-between border-b pb-2'>
                  <span className='text-slate-500'>Region:</span>
                  <span>{client.region}</span>
                </div>
                <div className='flex justify-between border-b pb-2'>
                  <span className='text-slate-500'>Zone:</span>
                  <span>{client.zone}</span>
                </div>
                <div className='flex justify-between border-b pb-2'>
                  <span className='text-slate-500'>Wereda / Kebele:</span>
                  <span>
                    {client.wereda} / {client.kebele}
                  </span>
                </div>
                <div className='flex justify-between border-b pb-2'>
                  <span className='text-slate-500'>House No:</span>
                  <span>{client.houseNumber}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* DOCUMENTS TAB */}
        <TabsContent value='documents' className='mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Upload Form */}
            <Card className='md:col-span-1 h-fit'>
              <CardHeader>
                <CardTitle className='text-lg'>Upload New</CardTitle>
                <CardDescription>Attach ID, Licenses, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='docType'>Document Type</Label>
                    <Input
                      id='docType'
                      placeholder='e.g. Kebele ID'
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='file'>Select File</Label>
                    <Input
                      id='file'
                      type='file'
                      onChange={(e) => setFile(e.target.files[0])}
                      required
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full bg-blue-900 hover:bg-blue-800'
                    disabled={uploading}
                  >
                    {uploading && (
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    )}
                    {uploading ? "Uploading..." : "Upload Document"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Files List */}
            <Card className='md:col-span-2'>
              <CardHeader>
                <CardTitle className='text-lg'>Existing Files</CardTitle>
              </CardHeader>
              <CardContent>
                {!client.documents || client.documents.length === 0 ? (
                  <div className='text-center py-8 text-slate-500 border border-dashed rounded-md'>
                    No documents uploaded yet.
                  </div>
                ) : (
                  <div className='space-y-3'>
                    {client.documents.map((doc, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-4 border rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors'
                      >
                        <div className='flex items-center gap-3'>
                          <div className='p-2 bg-blue-100 rounded text-blue-600'>
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className='font-semibold text-sm'>
                              {doc.docType}
                            </p>
                            <p className='text-xs text-slate-500'>
                              {doc.uploadedAt
                                ? new Date(doc.uploadedAt).toLocaleDateString()
                                : "Just now"}
                            </p>
                          </div>
                        </div>
                        <a
                          href={`http://localhost:8000${doc.url}`}
                          target='_blank'
                          rel='noreferrer'
                          className='text-sm font-medium text-blue-700 hover:underline border border-blue-200 px-3 py-1 rounded bg-white'
                        >
                          Open File
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailsPage;
