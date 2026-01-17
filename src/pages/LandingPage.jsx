import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Menu,
  Shield,
  Users,
  FileText,
  AlertTriangle,
  Wallet,
  Building2,
  PieChart,
  Award,
  ArrowUpRight,
} from "lucide-react";

import amharaBankLogo from "../assets/logos/amhara-bank.png";
import awashInternationalLogo from "../assets/logos/awash-bank.png";
import ayatRealEstateLogo from "../assets/logos/ayat-real-estate.png";
import blueMoonLogo from "../assets/logos/bluemoon.png";
import chapaLogo from "../assets/logos/chapa.png";
import dangoteLogo from "../assets/logos/dangote.png";
import eatAgencyLogo from "../assets/logos/ata.png";
import gashaDigitalLogo from "../assets/logos/gasha-digital.png";

const LandingPage = () => {
  const LOGOS = [
    { name: "Amhara Bank", img: amharaBankLogo },
    { name: "Awash International Bank", img: awashInternationalLogo },
    { name: "Ayat Real Estate", img: ayatRealEstateLogo },
    { name: "Blue Moon", img: blueMoonLogo },
    { name: "Chapa", img: chapaLogo },
    { name: "Dangote", img: dangoteLogo },
    {
      name: "Ethiopian Agricultural Transformation Agency",
      img: eatAgencyLogo,
    },
    { name: "Gasha Digital", img: gashaDigitalLogo },
  ];
  const SERVICES = [
    {
      title: "Client CRM",
      description:
        "Manage individual and business profiles with localized Ethiopian address fields (Wereda/Kebele) and document retention.",
      icon: <Users className='w-6 h-6' />,
    },
    {
      title: "Policy Administration",
      description:
        "Issue and renew policies across all categories (Motor, Marine, Engineering) with automated commission calculations.",
      icon: <FileText className='w-6 h-6' />,
    },
    {
      title: "Claims Workflow",
      description:
        "End-to-end tracking of incidents from reporting to settlement. Monitor approval statuses and approved amounts.",
      icon: <AlertTriangle className='w-6 h-6' />,
    },
    {
      title: "Financial Ledger",
      description:
        "Double-entry tracking for premiums and commissions. Manage CPO, Cheque, and Cash payments with precision.",
      icon: <Wallet className='w-6 h-6' />,
    },
    {
      title: "Carrier Management",
      description:
        "Maintain agreements with insurers like EIC, Awash, and Nyala. Track commission rates per policy type.",
      icon: <Building2 className='w-6 h-6' />,
    },
    {
      title: "Business Analytics",
      description:
        "Real-time dashboards showing active policies, expiring renewals, and revenue performance at a glance.",
      icon: <PieChart className='w-6 h-6' />,
    },
  ];
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
            <div className='mt-8 p-6 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/50 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.35)] max-w-lg relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-white/5 pointer-events-none' />
              <div className='absolute -top-10 -right-10 w-36 h-36 bg-brand-100/70 blur-3xl opacity-70 pointer-events-none' />
              <div className='absolute -bottom-12 -left-12 w-40 h-40 bg-slate-200/60 blur-3xl opacity-70 pointer-events-none' />
              <h3 className='relative text-lg md:text-xl font-bold text-slate-800 mb-2'>
                Elevate your brokerage with expert tools.
              </h3>
              <div className='relative flex justify-between items-end mt-4 gap-6'>
                <div className='flex-1'>
                  <span className='text-3xl md:text-4xl font-bold text-slate-900 block'>
                    98.5%
                  </span>
                  <span className='text-xs md:text-sm text-slate-500 font-medium'>
                    Claims Processed
                  </span>
                </div>
                <div className='flex-1 text-right'>
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
      <section className='py-12'>
        <div className='max-w-7xl mx-auto px-6'>
          <p className='text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8'>
            Trusted by Ethiopia's Top Insurers
          </p>

          {/* Slider Container with Fade Masks */}
          <div className='relative flex overflow-x-hidden group'>
            {/* Fade Masks */}
            <div className='absolute top-0 bottom-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent'></div>
            <div className='absolute top-0 bottom-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent'></div>

            {/* The Moving Track */}
            <div className='flex animate-scroll whitespace-nowrap'>
              {/* 1. Original Set */}
              <div className='flex gap-16 md:gap-24 mx-8 md:mx-12 items-center'>
                {LOGOS.map((company, index) => (
                  <div
                    key={`logo-1-${index}`}
                    className='relative h-12 w-[40px] cursor-pointer'
                  >
                    <img
                      src={company.img}
                      alt={company.name}
                      className='h-full w-auto object-contain opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer'
                    />
                  </div>
                ))}
              </div>

              {/* 2. Duplicate Set (For Infinite Loop) */}
              <div className='flex gap-16 md:gap-24 mx-8 md:mx-12 items-center'>
                {LOGOS.map((company, index) => (
                  <div
                    key={`logo-2-${index}`}
                    className='relative h-12 w-[50px] cursor-pointer'
                  >
                    <img
                      src={company.img}
                      alt={company.name}
                      className='h-full w-auto object-contain opacity-50  hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- Services / Features Section --- */}
      <section id='features' className='py-24 bg-white relative'>
        {/* Decorator Background Blob */}
        <div className='absolute top-1/2 left-0 w-full h-[500px] bg-slate-50 skew-y-3 -z-10'></div>

        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          {/* Section Header */}
          <div className='text-center max-w-3xl mx-auto mb-16 space-y-4'>
            <h2 className='text-3xl md:text-5xl font-bold text-slate-900 tracking-tight'>
              Complete Solutions for <br />
              <span className='text-brand-600'>Modern Brokerage</span>
            </h2>
            <p className='text-lg text-slate-500'>
              Replace fragmented spreadsheets with a unified system designed for
              the Ethiopian insurance market.
            </p>
          </div>

          {/* Services Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {SERVICES.map((service, index) => (
              <div
                key={index}
                className='group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-1 hover:border-brand-200 transition-all duration-300'
              >
                {/* Icon Container */}
                <div className='w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300'>
                  {service.icon}
                </div>

                <h3 className='text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors'>
                  {service.title}
                </h3>

                <p className='text-slate-500 leading-relaxed mb-6'>
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div className='flex items-center text-sm font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0'>
                  <span>Learn more</span>
                  <ArrowUpRight className='ml-1 w-4 h-4' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
