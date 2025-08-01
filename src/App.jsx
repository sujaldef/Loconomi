import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './Pages/LandingPage/index';
import AboutPage from './Pages/AboutPage/index';
import ServicePage from './Pages/ServicePage/index';
import ContactPage from './Pages/ContactPage/index';
import Login from './Pages/Login/index';
import Hire from './Pages/Hire/index';
import JoinAsWorker from './Pages/JoinAsWorker/index';
import RegisterWorkers from './Pages/RegisterWorkers/index';
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hire" element={<Hire/>} />
            <Route path="/joinasworker" element={<JoinAsWorker/>} />
            <Route path="/registerworker" element={<RegisterWorkers/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
