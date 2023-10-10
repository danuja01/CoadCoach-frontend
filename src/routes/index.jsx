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
  Register //CreateLab,
  //UpdateLab,
} from "@/pages";
import CreateLab from "@/pages/createLab";
import UpdateLab from "@/pages/updateLab";

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
        <Route path="/createLab" element={<CreateLab />} />
        <Route path="/updateLab" element={<UpdateLab />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
