
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nexora-dark to-black">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center min-h-screen pt-16 pb-16"
      >
        <div className="text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-nexora-secondary via-nexora-primary to-nexora-accent bg-clip-text text-transparent mb-6"
          >
            404
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-300 mb-8">The page you are looking for doesn't exist or has been moved.</p>
            
            <Link 
              to="/" 
              className="inline-block bg-gradient-to-r from-nexora-primary to-nexora-secondary px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              Return to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
