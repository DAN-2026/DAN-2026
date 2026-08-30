import { Link, useLocation } from 'react-router-dom';
import danImage from "../assets/images/logo-dan.png";

function Navbar() {
  const location = useLocation();

  const menu = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/event' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">

      {/* Container */}
      <div className="relative mx-auto max-w-6xl h-16 flex items-center justify-center">

        {/* LOGO - SELALU DI KIRI */}
        <Link
          to="/"
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          <img
            src={danImage}
            alt="Duta Anti Narkoba UMN"
            className="h-12 w-auto object-contain sm:h-20"
          />
        </Link>

        {/* NAVBAR - SELALU DI TENGAH */}
        <nav className="flex items-center gap-1 px-1.5 py-1.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl sm:gap-2 sm:px-2 sm:py-2">

          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-full px-3 py-2 text-xs font-medium transition-all duration-300
                sm:px-5 sm:py-2 sm:text-sm
                ${location.pathname === item.path
                  ? 'bg-cyan-400 text-slate-900'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {item.name}
            </Link>
          ))}

        </nav>

      </div>
    </div>
  );
}

export default Navbar;