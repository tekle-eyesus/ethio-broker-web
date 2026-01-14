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
import ClaimsPage from "./pages/claims/ClaimsPage";
import ClaimFormPage from "./pages/claims/ClaimFormPage";
import ClaimDetailsPage from "./pages/claims/ClaimDetailsPage";
import FinancePage from "./pages/finance/FinancePage";
import PolicyFinancePage from "./pages/finance/PolicyFinancePage";
import SettingsPage from "./pages/settings/SettingsPage";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
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
            path: "/dashboard",
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
          { path: "/claims", element: <ClaimsPage /> },
          { path: "/claims/new", element: <ClaimFormPage /> },
          { path: "/claims/:id", element: <ClaimDetailsPage /> },
          { path: "/claims/:id/edit", element: <ClaimFormPage /> },
          { path: "/finance", element: <FinancePage /> },
          {
            path: "/policies/:policyId/finance",
            element: <PolicyFinancePage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
