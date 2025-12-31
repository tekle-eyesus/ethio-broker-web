import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCarriers, deleteCarrier } from "../../services/carrierService";
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
import { Plus, Building2, Phone, Edit, Trash2, Loader2 } from "lucide-react";

const CarriersPage = () => {
  const [carriers, setCarriers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCarriers = async () => {
    setLoading(true);
    try {
      const data = await getCarriers();
      setCarriers(data);
    } catch (error) {
      console.error("Failed to fetch carriers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarriers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCarrier(id);
      fetchCarriers(); // Refresh list
    } catch (error) {
      alert("Failed to delete carrier");
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Insurance Carriers
          </h1>
          <p className='text-slate-500 mt-1'>
            Manage insurance companies and commission structures.
          </p>
        </div>
        <Link to='/carriers/new'>
          <Button className='bg-blue-900 hover:bg-blue-800 text-blue-100'>
            <Plus className='mr-2 h-4 w-4' /> Add Carrier
          </Button>
        </Link>
      </div>

      <div className='rounded-md border bg-white shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Alias</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Commission Defaults</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  <Loader2 className='animate-spin h-6 w-6 mx-auto text-slate-400' />
                </TableCell>
              </TableRow>
            ) : carriers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='h-24 text-center text-slate-500'
                >
                  No carriers found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              carriers.map((carrier) => (
                <TableRow key={carrier._id}>
                  <TableCell className='font-medium flex items-center gap-2'>
                    <Building2 className='text-slate-400 h-4 w-4' />
                    {carrier.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant='outline'>{carrier.alias}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className='text-sm'>
                      <div className='flex items-center gap-1'>
                        <Phone size={12} /> {carrier.contactInfo?.phone}
                      </div>
                      <div className='text-slate-500 text-xs'>
                        {carrier.contactInfo?.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {carrier.commissionDefaults
                        ?.slice(0, 3)
                        .map((comm, idx) => (
                          <Badge
                            key={idx}
                            variant='secondary'
                            className='text-xs'
                          >
                            {comm.policyType}: {comm.percentage}%
                          </Badge>
                        ))}
                      {(carrier.commissionDefaults?.length || 0) > 3 && (
                        <span className='text-xs text-slate-500'>
                          +{carrier.commissionDefaults.length - 3} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Link to={`/carriers/${carrier._id}/edit`}>
                        <Button variant='ghost' size='icon' className='h-8 w-8'>
                          <Edit className='h-4 w-4 text-blue-600' />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 hover:text-red-600'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Carrier?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will archive {carrier.name}. Active policies
                              linked to this carrier will remain, but you cannot
                              create new ones.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(carrier._id)}
                              className='bg-red-600'
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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

export default CarriersPage;
