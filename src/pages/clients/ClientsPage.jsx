import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClients } from "../../services/clientService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Plus, Search, Loader2 } from "lucide-react";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // Simple debounce logic could be added here for search

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await getClients({ search });
      setClients(data.clients);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search (wait 500ms after typing stops)
    const timer = setTimeout(() => {
      fetchClients();
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Clients</h1>
          <p className='text-slate-500 mt-1'>
            Manage your individual and business clients.
          </p>
        </div>
        <Link to='/clients/new'>
          <Button className='bg-blue-900 hover:bg-blue-800 text-blue-100'>
            <Plus className='mr-2 h-4 w-4' /> Add Client
          </Button>
        </Link>
      </div>

      <div className='flex-1 relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
        <Input
          placeholder='Search Policy Number...'
          className='pl-9 bg-slate-50 border-none'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='rounded-md border bg-white shadow-sm'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name / Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Region / Zone</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  <div className='flex justify-center items-center'>
                    <Loader2 className='h-6 w-6 animate-spin text-slate-400' />
                  </div>
                </TableCell>
              </TableRow>
            ) : clients.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='h-24 text-center text-slate-500'
                >
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow key={client._id}>
                  <TableCell className='font-medium'>
                    {client.type === "Individual"
                      ? `${client.firstName} ${client.fatherName}`
                      : client.companyName}
                    {client.type === "Business" && (
                      <div className='text-xs text-slate-500'>
                        TIN: {client.tinNumber}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.type === "Business" ? "secondary" : "outline"
                      }
                    >
                      {client.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    {client.region}, {client.zone}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Button variant='ghost' size='sm' asChild>
                      <Link to={`/clients/${client._id}`}>View</Link>
                    </Button>
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

export default ClientsPage;
