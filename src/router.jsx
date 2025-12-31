import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ClientsPage from "./pages/clients/ClientsPage";
import CreateClientPage from "./pages/clients/createClientPage";
import ClientDetailsPage from "./pages/clients/ClientDetailsPage";
import EditClientPage from "./pages/clients/EditClientPage";
import CarriersPage from "./pages/carriers/CarriersPage";
import CarrierFormPage from "./pages/carriers/CarrierFormPage";
import PoliciesPage from "./pages/policies/PoliciesPage";
import PolicyFormPage from "./pages/policies/PolicyFormPage";
import PolicyDetailsPage from "./pages/policies/PolicyDetailsPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
          },
          {
            path: "/clients",
            element: <ClientsPage />,
          },
          {
            path: "/clients/new",
            element: <CreateClientPage />,
          },
          {
            path: "/clients/:id",
            element: <ClientDetailsPage />,
          },
          {
            path: "/clients/:id/edit",
            element: <EditClientPage />,
          },
          {
            path: "/carriers",
            element: <CarriersPage />,
          },
          {
            path: "/carriers/new",
            element: <CarrierFormPage />,
          },
          {
            path: "/carriers/:id/edit",
            element: <CarrierFormPage />,
          },
          { path: "/policies", element: <PoliciesPage /> },
          { path: "/policies/new", element: <PolicyFormPage /> },
          { path: "/policies/:id", element: <PolicyDetailsPage /> },
          { path: "/policies/:id/edit", element: <PolicyFormPage /> },
        ],
      },
    ],
  },
]);

export default router;
