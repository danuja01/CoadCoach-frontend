import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  AdminDashboard,
  CreateQuestion,
  Dashboard,
  InsDashboard,
  InsSelectLab,
  LabQuestions,
  Landing,
  Login,
  Question,
  Register
} from "@/pages";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/question" element={<Question />} />
        <Route path="/instructor-dashboard" element={<InsDashboard />} />
        <Route path="/create-question" element={<CreateQuestion />} />
        <Route path="/lab-questions" element={<LabQuestions />} />
        <Route path="/insSelect-lab" element={<InsSelectLab />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
