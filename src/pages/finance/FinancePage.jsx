import { useEffect, useState } from "react";
import { getFinancialReport } from "../../services/financeService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Loader2, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const FinancePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all transactions (backend default sort is date desc)
    getFinancialReport({})
      .then(setTransactions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          Financial Overview
        </h1>
        <p className='text-slate-500 mt-1'>
          Recent transactions across all policies.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Payer / Payee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center h-24'>
                    <Loader2 className='animate-spin inline mr-2' />
                    Loading...
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className='text-center h-24 text-slate-500'
                  >
                    No data found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx._id}>
                    <TableCell>
                      {new Date(tx.transactionDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className='font-medium'>
                      {tx.client?.companyName || tx.client?.firstName}
                    </TableCell>
                    <TableCell>
                      {tx.type === "ClientPayment" ? (
                        <Badge
                          variant='outline'
                          className='bg-green-50 text-green-700 border-green-200'
                        >
                          {" "}
                          <ArrowDownLeft size={12} className='mr-1' /> In
                        </Badge>
                      ) : (
                        <Badge
                          variant='outline'
                          className='bg-orange-50 text-orange-700 border-orange-200'
                        >
                          {" "}
                          <ArrowUpRight size={12} className='mr-1' /> Out
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{tx.paymentMethod}</TableCell>
                    <TableCell className='text-right'>
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

export default FinancePage;
