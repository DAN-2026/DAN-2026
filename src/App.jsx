import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home/Home';
import Event from './Pages/Event/Event';
import AboutUs from './Pages/AboutUs/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageTransition />
    </BrowserRouter>
  );
}

function PageTransition() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/event" element={<Event />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
