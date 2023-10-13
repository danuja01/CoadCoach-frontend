import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks";
import { default as AnimatedRoutes } from "@/routes";
import { store } from "@/store";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const completed = useAuth(["ADMIN", "STUDENT"]);
  return (
    <Provider store={store}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.3 }}
      >
        <ToastContainer />
        <AnimatedRoutes />
      </motion.main>
    </Provider>
  );
};

export default App;
