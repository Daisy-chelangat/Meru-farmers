import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterForm from "./pages/RegisterForm";
import ProductsPagePreview from "./pages/Products";
import FarmerDashboard from "./pages/FarmerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  const userRole = localStorage.getItem("role"); // Get user role from localStorage

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterForm />} />
        <Route path="products" element={<ProductsPagePreview />} />
        <Route path="FarmerDashboard" element={<FarmerDashboard />} />
        <Route path="CustomerDashboard" element={<CustomerDashboard />} />
        <Route
          path="dashboard"
          element={
            userRole === "farmer" ? (
              <Navigate to="/FarmerDashboard" />
            ) : userRole === "customer" ? (
              <Navigate to="/CustomerDashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;