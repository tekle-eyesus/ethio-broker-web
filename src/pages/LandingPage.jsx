import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ShieldCheck,
  Users,
  FileText,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-white font-sans text-slate-900'>
      {/* --- Navigation --- */}
      <nav className='fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='bg-blue-900 p-1.5 rounded-md'>
              <LayoutDashboard className='h-5 w-5 text-white' />
            </div>
            <span className='text-xl font-bold tracking-tight text-slate-900'>
              EthioBroker
            </span>
          </div>
          <div className='flex items-center gap-4'>
            <Link to='/login'>
              <Button
                variant='ghost'
                className='text-slate-600 hover:text-blue-900'
              >
                Sign In
              </Button>
            </Link>
            <Link to='/login'>
              <Button className='bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6'>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className='pt-32 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white'>
        <div className='max-w-5xl mx-auto text-center space-y-8'>
          <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium'>
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-blue-500'></span>
            </span>
            v1.0 Now Live in Ethiopia
          </div>

          <h1 className='text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]'>
            Modern Insurance Management <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600'>
              Simplifying Your Brokerage
            </span>
          </h1>

          <p className='text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed'>
            The complete solution for Ethiopian insurance brokers. Manage
            clients, track policies, handle claims, and reconcile financials—all
            in one secure platform.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
            <Link to='/login'>
              <Button className='h-12 px-8 text-lg rounded-full bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all hover:scale-105'>
                Start Managing Now <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
            <Button
              variant='outline'
              className='h-12 px-8 text-lg rounded-full border-slate-300 text-slate-700 hover:bg-slate-50'
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* --- Value Proposition --- */}
      <section className='py-24 px-6 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-slate-900'>
              Everything you need to run your firm
            </h2>
            <p className='text-slate-500 mt-2'>
              Replace spreadsheets with a dedicated professional system.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <div className='p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all'>
              <div className='h-12 w-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 shadow-sm'>
                <Users className='h-6 w-6 text-blue-700' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Client Management</h3>
              <p className='text-slate-500 leading-relaxed'>
                Organize individual and business clients with Ethiopian address
                formats (Wereda/Kebele) and document storage.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all'>
              <div className='h-12 w-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 shadow-sm'>
                <ShieldCheck className='h-6 w-6 text-blue-700' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Policy & Renewals</h3>
              <p className='text-slate-500 leading-relaxed'>
                Track policy lifecycles from issuance to renewal. Get automated
                alerts for expiring coverage to retain clients.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:shadow-md transition-all'>
              <div className='h-12 w-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center mb-6 shadow-sm'>
                <TrendingUp className='h-6 w-6 text-blue-700' />
              </div>
              <h3 className='text-xl font-bold mb-3'>Financial Ledger</h3>
              <p className='text-slate-500 leading-relaxed'>
                Monitor premiums collected and commissions earned. Generate
                instant statements for client and carrier balances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trust / Checkmarks --- */}
      <section className='py-20 border-t border-slate-100 bg-slate-50'>
        <div className='max-w-5xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-slate-900 mb-6'>
                Built for the Ethiopian Market
              </h2>
              <div className='space-y-4'>
                {[
                  "Compliance with local insurance regulations",
                  "Support for CPO, Cheque, and Bank Transfer tracking",
                  "Kebele and Wereda address structure",
                  "TIN and Trade License management",
                  "Secure role-based access for agents",
                ].map((item, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <CheckCircle2 className='h-5 w-5 text-blue-600 flex-shrink-0' />
                    <span className='text-slate-700'>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='relative'>
              {/* Abstract decorative element representing a dashboard */}
              <div className='absolute inset-0 bg-blue-200 rounded-2xl rotate-3 opacity-20 blur-xl'></div>
              <div className='relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100'>
                <div className='flex items-center justify-between border-b pb-4 mb-4'>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full bg-red-400'></div>
                    <div className='h-3 w-3 rounded-full bg-yellow-400'></div>
                    <div className='h-3 w-3 rounded-full bg-green-400'></div>
                  </div>
                  <div className='h-2 w-20 bg-slate-100 rounded'></div>
                </div>
                <div className='space-y-3'>
                  <div className='h-8 w-3/4 bg-slate-100 rounded'></div>
                  <div className='h-8 w-full bg-slate-50 rounded'></div>
                  <div className='h-8 w-5/6 bg-slate-100 rounded'></div>
                  <div className='h-24 w-full bg-blue-50/50 rounded border border-blue-50 mt-4 flex items-center justify-center text-blue-200'>
                    <FileText className='h-10 w-10 opacity-50' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className='py-12 px-6 border-t border-slate-200 bg-white text-center'>
        <p className='text-slate-500 text-sm'>
          &copy; {new Date().getFullYear()} EthioBroker Systems. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
