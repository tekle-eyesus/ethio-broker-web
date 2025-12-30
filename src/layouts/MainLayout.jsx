import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Sidebar />
      <Header />
      <main className='ml-64 pt-16 p-8 min-h-screen'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
