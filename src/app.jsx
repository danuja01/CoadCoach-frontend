import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer, Header } from "@/components";
import { useAuth } from "@/hooks";
import { default as AnimatedRoutes } from "@/routes";
import { store } from "@/store";

const App = () => {
  // const completed = useAuth();
  return (
    <Provider store={store}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <AnimatedRoutes />
        <Footer />
      </motion.main>
    </Provider>
  );
};

export default App;
