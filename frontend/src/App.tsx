import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Benefits from "./components/Benefits";
import MissionBanner from "./components/MissionBanner";
import ServicesGrid from "./components/ServicesGrid";
import Partners from "./components/Partners";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import BusinessServices from "./pages/BusinessServices";
import CandidateServices from "./pages/CandidateServices";
import ContactUs from "./pages/ContactUs";
import Opportunities from "./pages/Opportunities";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import OpportunityDetails from "./pages/OpportunityDetails";
import AdminApplications from "./pages/AdminApplications";
import AdminOpportunities from "./pages/AdminOpportunities";
import AdminSettings from "./pages/AdminSettings";

const Home = () => (
  <>
    <Hero />
    <WhyUs />
    <Benefits />
    <MissionBanner />
    <ServicesGrid />
    <Partners />
  </>
);

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isFullPageLayout =
    location.pathname.startsWith("/signin") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isFullPageLayout && <Navbar />}

      <div className="flex-grow">{children}</div>

      {!isFullPageLayout && <Footer />}
    </div>
  );
};

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/business-services" element={<BusinessServices />} />
          <Route path="/candidate-services" element={<CandidateServices />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/opportunities/:id" element={<OpportunityDetails />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <RequireAuth>
                <AdminApplications />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/opportunities"
            element={
              <RequireAuth>
                <AdminOpportunities />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RequireAuth>
                <AdminSettings />
              </RequireAuth>
            }
          />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
