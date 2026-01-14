import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  Shield,
  TrendingUp,
  Award,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-900'>
      {/* --- Background Gradients (The "Glow" effect) --- */}
      <div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-100 rounded-full blur-[100px] opacity-70 pointer-events-none'></div>
      <div className='absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-70 pointer-events-none'></div>

      {/* --- Navigation --- */}
      <nav className='relative z-50 w-full pt-4 px-5 md:px-10'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2'>
              <Shield className='text-brand-600 fill-brand-100' />
              EthioBroker
            </span>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center gap-6 text-sm font-medium text-slate-600'>
            <a
              href='#features'
              className='hover:text-brand-600 transition-colors'
            >
              Features
            </a>
            <a
              href='#solutions'
              className='hover:text-brand-600 transition-colors'
            >
              Solutions
            </a>
            <a
              href='#resources'
              className='hover:text-brand-600 transition-colors'
            >
              Resources
            </a>
          </div>

          <div className='flex items-center gap-4'>
            <Link
              to='/login'
              className='hidden md:block font-medium text-slate-600 hover:text-brand-600'
            >
              Sign In
            </Link>
            <Link to='/login'>
              <Button className='rounded-full bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 h-auto text-sm md:text-base'>
                Get Started
              </Button>
            </Link>
            <button className='md:hidden p-2'>
              <Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className='relative z-10 pt-12 pb-14 px-5 md:px-10 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
          {/* Left Column: Text */}
          <div className='space-y-6 max-w-2xl'>
            <h1 className='text-4xl md:text-5xl font-bold leading-tight text-slate-900'>
              Modern Insurance <br />
              for <span className='text-brand-500 '>Ethiopian Biz.</span>
            </h1>

            <p className='text-base md:text-lg text-slate-500 max-w-xl leading-relaxed'>
              Empowering brokers and businesses with clarity, compliance, and
              operational excellence to build a future-ready portfolio.
            </p>

            <div className='flex flex-col sm:flex-row gap-3 pt-2'>
              <Link to='/login'>
                <Button className='rounded-full bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 cursor-pointer h-auto text-base md:text-lg w-full sm:w-auto shadow-lg shadow-slate-900/15'>
                  Book Consultation
                </Button>
              </Link>
              <Link to='/login'>
                <Button
                  variant='outline'
                  className='rounded-full border-slate-300 text-slate-700 px-7 py-3 cursor-pointer h-auto text-base md:text-lg w-full sm:w-auto hover:bg-white hover:border-brand-300'
                >
                  Contact Support
                </Button>
              </Link>
            </div>

            {/* Glass Card (Stats) */}
            <div className='mt-8 p-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/70 shadow-lg max-w-lg'>
              <h3 className='text-lg md:text-xl font-bold text-slate-800 mb-2'>
                Elevate your brokerage with expert tools.
              </h3>
              <div className='flex justify-between items-end mt-4 gap-6'>
                <div>
                  <span className='text-3xl md:text-4xl font-bold text-slate-900 block'>
                    98.5%
                  </span>
                  <span className='text-xs md:text-sm text-slate-500 font-medium'>
                    Claims Processed
                  </span>
                </div>
                <div>
                  <span className='text-3xl md:text-4xl font-bold text-slate-900 block'>
                    100%
                  </span>
                  <span className='text-xs md:text-sm text-slate-500 font-medium'>
                    NBE Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className='relative h-full flex justify-center lg:justify-end'>
            {/* Image Container with Glow */}
            <div className='relative w-full max-w-[420px] aspect-[3/4] rounded-[32px] overflow-hidden border-6 border-white/30 shadow-2xl'>
              {/* 
                   PLACEHOLDER IMAGE 
                   Replace 'src' below with your actual image later.
                   We use object-cover to ensure it fills the rounded box perfectly.
                */}
              <img
                src='/hero-broker.png'
                alt='Professional Ethiopian Broker'
                className='w-full h-full object-cover'
              />

              {/* Floating Badge on Image (Optional visual flair) */}
              <div className='absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-full shadow-lg flex items-center gap-2'>
                <Award className='w-4 h-4 text-brand-500' />
                <span className='text-xs md:text-sm font-bold text-slate-800'>
                  Top Rated Agent
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Logos Section (Trusted Partners) --- */}
      <section className='py-8 px-5'>
        <div className='max-w-6xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-10'>
          <p className='text-center text-xs md:text-sm font-semibold text-slate-400 uppercase tracking-[0.25em] mb-6'>
            Trusted by leading insurers
          </p>
          <div className='flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500'>
            {/* Text placeholders for Logos - Replace with SVGs later */}
            <span className='text-xl md:text-2xl font-bold text-slate-800'>
              EIC
            </span>
            <span className='text-xl md:text-2xl font-bold text-slate-800'>
              AWASH
            </span>
            <span className='text-xl md:text-2xl font-bold text-slate-800'>
              NYALA
            </span>
            <span className='text-xl md:text-2xl font-bold text-slate-800'>
              NIB
            </span>
            <span className='text-xl md:text-2xl font-bold text-slate-800'>
              UNITED
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
