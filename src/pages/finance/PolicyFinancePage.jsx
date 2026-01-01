import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPolicyStatement,
  createTransaction,
} from "../../services/financeService";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import {
  Loader2,
  ArrowLeft,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

const PolicyFinancePage = () => {
  const { policyId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "ClientPayment", // or CarrierRemittance
    amount: "",
    paymentMethod: "Cash",
    referenceNumber: "",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const fetchData = async () => {
    try {
      const result = await getPolicyStatement(policyId);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [policyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTxLoading(true);
    try {
      await createTransaction({
        policyId,
        ...formData,
        amount: Number(formData.amount),
      });
      setOpen(false);
      setFormData({ ...formData, amount: "", referenceNumber: "" }); // Reset form
      fetchData(); // Refresh ledger
    } catch (error) {
      alert("Transaction failed");
    } finally {
      setTxLoading(false);
    }
  };

  if (loading)
    return (
      <div className='p-10'>
        <Loader2 className='animate-spin' />
      </div>
    );
  if (!data) return <div>Data not found</div>;

  const { policyTotals, summary, transactions } = data;

  return (
    <div className='space-y-6 max-w-5xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Link
            to={`/policies/${policyId}`}
            className='text-slate-400 hover:text-slate-600'
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className='text-2xl font-bold'>Financial Ledger</h1>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='bg-blue-900 hover:bg-blue-800'>
              <Wallet className='mr-2 h-4 w-4' /> Record Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label>Transaction Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(val) =>
                    setFormData({ ...formData, type: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ClientPayment'>
                      Receive from Client
                    </SelectItem>
                    <SelectItem value='CarrierRemittance'>
                      Pay to Carrier
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label>Amount (ETB)</Label>
                <Input
                  type='number'
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(val) =>
                      setFormData({ ...formData, paymentMethod: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Cash'>Cash</SelectItem>
                      <SelectItem value='Bank Transfer'>
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value='Cheque'>Cheque</SelectItem>
                      <SelectItem value='CPO'>CPO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Date</Label>
                  <Input
                    type='date'
                    required
                    value={formData.transactionDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transactionDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label>Reference No. (Cheque/CPO)</Label>
                <Input
                  value={formData.referenceNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      referenceNumber: e.target.value,
                    })
                  }
                />
              </div>
              <Button type='submit' className='w-full' disabled={txLoading}>
                {txLoading ? "Recording..." : "Save Transaction"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='bg-slate-50 border-slate-200'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-slate-500'>
              Total Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {policyTotals.premium?.toLocaleString()} ETB
            </div>
            <div className='text-xs text-green-600 font-medium mt-1'>
              Comm: {policyTotals.commission?.toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-slate-500'>
              Client Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {summary.clientBalance > 0
                ? `${summary.clientBalance.toLocaleString()} Due`
                : "Paid"}
            </div>
            <div className='text-xs text-slate-500 mt-1'>
              Collected: {summary.totalPaidByClient?.toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-sm font-medium text-slate-500'>
              Carrier Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {summary.carrierBalance > 0
                ? `${summary.carrierBalance.toLocaleString()} Payable`
                : "Settled"}
            </div>
            <div className='text-xs text-slate-500 mt-1'>
              Remitted: {summary.totalRemittedToCarrier?.toLocaleString()} ETB
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center h-24 text-slate-500'
                  >
                    No transactions recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>
                      {new Date(tx.transactionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        {tx.type === "ClientPayment" ? (
                          <ArrowDownLeft size={16} className='text-green-600' />
                        ) : (
                          <ArrowUpRight size={16} className='text-orange-600' />
                        )}
                        {tx.type === "ClientPayment"
                          ? "Received from Client"
                          : "Remitted to Carrier"}
                      </div>
                    </TableCell>
                    <TableCell className='font-mono text-xs'>
                      {tx.referenceNumber || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>{tx.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell className='text-right font-medium'>
                      {tx.amount.toLocaleString()} ETB
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyFinancePage;
