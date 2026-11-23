import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import voteMascot from './assets/logoutama/vote-mascot.webp';

const Home = lazy(() => import('./Pages/Home/Home'));
const Event = lazy(() => import('./Pages/Event/Event'));
const AboutUs = lazy(() => import('./Pages/AboutUs/AboutUs'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <PageTransition />
      <Analytics />
    </BrowserRouter>
  );
}

function PageTransition() {
  const location = useLocation();
  const [isVoteMascotVisible, setIsVoteMascotVisible] = useState(true);

  useEffect(() => {
    if (location.hash) {
      const scrollTimeout = window.setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 0);

      return () => window.clearTimeout(scrollTimeout);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  return (
    <>
      {location.pathname === '/' && (
        <div className="fixed right-0 top-[35%] z-40 -translate-y-1/2">
          {isVoteMascotVisible ? (
            <div className="relative transition duration-300 hover:scale-105">
              <Link
                to="/event#cara-voting"
                aria-label="Pergi ke halaman cara voting"
                className="block rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
              >
                <img
                  src={voteMascot}
                  alt="Maskot Vote"
                  className="h-14 w-14 rounded-full border border-cyan-300/70 object-cover shadow-[0_10px_28px_rgba(34,211,238,0.35)] sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20"
                />
              </Link>
              <button
                type="button"
                onClick={() => setIsVoteMascotVisible(false)}
                aria-label="Sembunyikan ikon vote"
                className="absolute right-full top-1/2 mr-1 flex h-10 w-5 -translate-y-1/2 items-center justify-center bg-transparent text-cyan-100/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsVoteMascotVisible(true)}
              aria-label="Tampilkan kembali ikon vote"
              className="flex h-8 w-6 items-center justify-center rounded-l-full border border-r-0 border-cyan-300/50 bg-slate-950/90 text-cyan-300 shadow-lg transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      <div key={location.pathname} className="page-transition">
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-200">Memuat halaman...</div>}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
